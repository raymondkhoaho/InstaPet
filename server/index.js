require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line

const app = express();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
