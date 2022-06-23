// import { knexSnakeCaseMappers } from "objection";
const { knexSnakeCaseMappers } = require("objection");

// Update with your config settings.
// export default {
module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      host: process.env.NUXT_DATABASE_HOST,
      port: process.env.NUXT_DATABASE_PORT,
      user: process.env.NUXT_DATABASE_USER,
      password: process.env.NUXT_DATABASE_PASS,
      database: process.env.NUXT_DATABASE_NAME,
    },
    pool: { min: 0, max: 7 },
    migrations: {
      extension: "ts",
      tableName: "migrations",
    },
    debug: true,
    ...knexSnakeCaseMappers,
  },
  production: {
    client: "pg",
    connection: process.env.NUXT_DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: "ts",
      tableName: "migrations",
    },
  },
  ...knexSnakeCaseMappers,
};
