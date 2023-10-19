export default () => ({
  database: {
    url: process.env.MONGO_DB_API,
    name: process.env.DATABASE_NAME,
  },
});
