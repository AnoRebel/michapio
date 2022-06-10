import { knexSnakeCaseMappers } from "objection";

// Update with your config settings.
export default {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      host: "localhost",
      port: "5432",
      user: useRuntimeConfig().DATABASE_USER,
      password: useRuntimeConfig().DATABASE_PASS,
      database: useRuntimeConfig().DATABASE_NAME,
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
    connection: useRuntimeConfig().DATABASE_URL,
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
