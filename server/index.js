require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');

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

app.get('/api/users/:userId', (req, res, next) => {
  const id = Number(req.params.userId);
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
    where "u"."userId" = $1
    order by "photoId" desc
  `;
  const param = [id];
  db.query(sql, param)
    .then(result => {
      const user = result.rows;
      if (!user) {
        throw new ClientError(404, `Cannot find user with userId ${id}`);
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => next(err));
}
);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
