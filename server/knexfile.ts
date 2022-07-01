import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { knexSnakeCaseMappers } from "objection";
import { config } from "dotenv";

config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "..", ".env"),
});

// const { knexSnakeCaseMappers } = require("objection");
// const path = require("path");

// require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// const extension =
//   process.env.NODE_CONFIG_ENV == "production" || process.env.NODE_CONFIG_ENV == "staging"
//     ? "js"
//     : "ts";

// Update with your config settings.
// module.exports = {
export default {
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
      extension: "ts", // extension,
      loadExtensions: [".ts"], // [`.${extension}`],
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
