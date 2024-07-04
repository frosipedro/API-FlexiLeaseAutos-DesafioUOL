module.exports = {
  mongodb: {
    url: 'mongodb://localhost:27017/FlexiLeaseAutos',

    databaseName: 'FlexiLeaseAutos',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: './src/database/migrations',

  changelogCollectionName: 'changelog',
};
