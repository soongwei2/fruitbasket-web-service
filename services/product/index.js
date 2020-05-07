const express = require('express');
const router = express.Router();
const functions = require('./functions');
const errorDef = require('../../utilities/handler/errorDef');
const _ = require('lodash');

const crudUtils = require('../../utilities/crud-utils');
const model = require('@soongwei/mysql-db/databases/fruitBasketMaster').product

crudUtils(router, model);

router.post('/full', function (req, res, next) {
    const payload = req.body;

    errorDef.parameterHandler([payload]);

    return functions.getProduct(payload).then((results) => {
        return res.status(200).send(results);
    }).catch((reason) => {
        next(reason);
    });
}); 

module.exports = router;