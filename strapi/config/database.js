module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DB_HOST", "127.0.0.1"),
      port: env.int("DB_PORT", 5432),
      database: env("DB_NAME", "e_nollning"),
      user: env("DB_USERNAME", "postgres"),
      password: env("DB_PASSWORD", "password"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
