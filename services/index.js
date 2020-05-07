const monitor = require('./monitor');

const errorResponseHandler = require('../utilities/handler/errorDef').errorResponseHandler;
const errorClientHandler = require('../utilities/handler/errorDef').errorClientHandler;

class ServicesIndex {
  constructor(app) {
    this.app = app;
  }

  registerServices() {
    
    this.app.use('/monitor', monitor);
    this.app.use('/user', require('./user'));    
    this.app.use('/promotion', require('./promotion'));  
    this.app.use('/product', require('./product'));  
    this.app.use('/invoice', require('./invoice'));

    this.app.use(errorResponseHandler);
    this.app.use(errorClientHandler);
 
  }
}

module.exports = (app) => {
  return new ServicesIndex(app).registerServices();
}