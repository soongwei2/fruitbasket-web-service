const express = require('express');
const config = require('config');
const logUtils = require('./utilities/log.utils');
const authSyncDatabase = require('@soongwei/mysql-db').authSyncDatabase;

const app = express();

const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();

Promise.resolve().then(() => {
  //add database account to env var
  process.env.databaseAccount = JSON.stringify({
    username: "root",
    password: "P@ssw0rd@#1",
    options: {
      host: "localhost",
      port: 3306,
      dialect: "mysql",
    }
  });
}).then(() => {
  return require('@soongwei/mysql-db/databases/fruitBasketMaster');
}).then((database) => {
  return authSyncDatabase(database, {
    logging: true
  });
}).then(() => {
  const services = require('./services');

  logUtils.initDebugLogging(app);

  services(app);
  logUtils.initErrorLogging(app);

  const port = process.env.PORT || 9090;

  app.listen(port, () => {
    console.info(`Service started listening on port: ${port}`)
  });
}).catch((error) => {
  console.error("Problem starting service: ", error);
})



module.exports = app;