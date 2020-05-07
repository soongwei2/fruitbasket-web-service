const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');


class MiddlewareIndex {
    constructor(app) {
        this.app = app;
    }
    configureMiddlewares() {

        this.app.use(cors());
        this.app.options('*', cors()); 
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
     
    }
}

module.exports = (app) => {
    return new MiddlewareIndex(app);
}