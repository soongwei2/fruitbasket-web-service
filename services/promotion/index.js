const express = require('express');
const router = express.Router();
const functions = require('./functions');
const errorDef = require('../../utilities/handler/errorDef');
const _ = require('lodash');

const crudUtils = require('../../utilities/crud-utils');
const model = require('@soongwei/mysql-db/databases/fruitBasketMaster').promotion

crudUtils(router, model);

router.post('/checkCouponCode', function (req, res, next) {
    const payload = req.body;

    errorDef.parameterHandler([payload, payload.couponCode]);

    return functions.checkCouponCode(payload).then((results) => {
        return res.status(200).send(results);
    }).catch((reason) => {
        next(reason);
    });
}); 

router.put('/full', function (req, res, next) {
    const payload = req.body;

    errorDef.parameterHandler([payload, payload.couponCode]);

    return functions.addPromotion(payload).then((results) => {
        return res.status(200).send(results);
    }).catch((reason) => {
        next(reason);
    });
}); 

module.exports = router;