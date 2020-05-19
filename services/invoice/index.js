const express = require('express');
const router = express.Router();
const functions = require('./functions');
const errorDef = require('../../utilities/handler/errorDef');
const _ = require('lodash');

const crudUtils = require('../../utilities/crud-utils');
const model = require('@soongwei/mysql-db/databases/fruitBasketMaster').invoice

crudUtils(router, model);

router.post('/full', function (req, res, next) {
    const payload = req.body;

    errorDef.parameterHandler([payload]);

    return functions.postInvoice(payload).then((results) => {
        return res.status(200).send(results);
    }).catch((reason) => {
        next(reason);
    });
}); 

router.put('/full', function (req, res, next) {
    const payload = req.body;

    errorDef.parameterHandler([payload, payload.invoice]);

    return functions.putInvoice(payload).then((results) => {
        return res.status(200).send(results);
    }).catch((reason) => {
        next(reason);
    });
}); 

router.put('/payment', function (req, res, next) {
    const payload = req.body;

    errorDef.parameterHandler([payload, payload.basketArr, payload.invoice, payload.userId]);

    return functions.putInvoice(payload).then((results) => {
        return res.status(200).send(results);
    }).catch((reason) => {
        next(reason);
    });
}); 


module.exports = router;