require('dotenv/config');
// const path = require('path');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const authorizationMiddleware = require('./authorization-middleware');

const app = express();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// const publicPath = path.join(__dirname, 'public');

// if (process.env.NODE_ENV === 'development') {
//   app.use(require('./dev-middleware')(publicPath));
// }

// app.use(express.static(publicPath));
app.use(staticMiddleware);

app.use(express.json());

app.get('/api/photos', (req, res, next) => {
  const sql = `
  select "p"."caption",
         "p"."createdAt",
         "p"."imageUrl",
         "p"."photoId",
         "p"."userId",
         "u"."profileImageUrl",
         "u"."username"
    from "photos" as "p"
    join "users" as "u" using ("userId")
    order by "photoId" desc
  `;

  db.query(sql)
    .then(result => {
      const photos = result.rows;
      res.status(200).json(photos);
    })
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const sql = `
  select "userId",
         "username",
         "profileImageUrl",
         "headerImageUrl"
    from "users"
  `;

  db.query(sql)
    .then(result => {
      const photos = result.rows;
      res.status(200).json(photos);
    })
    .catch(err => next(err));
});

app.get('/api/user/:username', (req, res, next) => {
  const username = req.params.username;
  const sql = `
  select "p"."caption",
         "p"."createdAt",
         "p"."imageUrl",
         "p"."photoId",
         "p"."userId",
         "u"."profileImageUrl",
         "u"."headerImageUrl",
         "u"."username"
    from "photos" as "p"
    join "users" as "u" using ("userId")
    where "u"."username" = $1
    order by "photoId" desc
  `;
  const param = [username];
  db.query(sql, param)
    .then(result => {
      const user = result.rows;
      if (!user) {
        throw new ClientError(404, `Cannot find user with username ${username}`);
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => next(err));
}
);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(password => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
        `;
      const params = [username, password];
      return db.query(sql, params);
    })
    .then(result => {
      const [newUser] = result.rows;
      if (!newUser) {
        throw new ClientError(409, 'Username already exists');
      } else {
        res.status(201).json(newUser);
      }
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'Username and password are required fields!');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "profileImageUrl",
           "username"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'Username not found.');
      }
      const { userId, hashedPassword, profileImageUrl, username } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid password');
          }
          const payload = { userId, username, profileImageUrl };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  const { caption } = req.body;
  if (!caption) {
    throw new ClientError(400, 'caption is a required field');
  }
  const imageUrl = '/images/' + req.file.filename;
  const sql = `
  insert into "photos" ("caption", "imageUrl")
  values ($1, $2)
    returning *
  `;

  const params = [caption, imageUrl];

  db.query(sql, params)
    .then(result => {
      const [returning] = result.rows;
      res.json(returning);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
