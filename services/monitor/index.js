const express = require('express');
const router = express.Router();
const monitorFunctions = require('./functions');
const errorDef = require('../../utilities/handler/errorDef');


/**
 * Testing api health
 * 
 * @route GET /monitor/health
 * @operationId getHealth
 * @group Monitor - API testing checker
 * @returns {Ok.model} 200 - OK
 * @returns {Error.model} 400 - Bad Request
 */
router.get('/health', function (req, res, next) {

    return monitorFunctions.healthChecker()
        .then((result) => {
            return res.send({
                code: 'OK',
                message: result
            });

        }).catch((reason) => {
            let errorResponse = errorDef.DATABASE_ISSUE;
            errorResponse.error = reason;
            return res.status(400).send(errorResponse);
        })
});

/**
 * Testing api health
 * 
 * @route POST /monitor/health
 * @operationId postHealth
 * @group Monitor - API testing checker
 * @returns {OK.model} 200 - OK
 * @returns {Error.model} 400 - Bad Request
 */
router.post('/health', function (req, res, next) {
    return monitorFunctions.healthChecker()
        .then((result) => {
            return res.send({
                code: 'OK',
                message: result
            });

        }).catch((reason) => {
            let errorResponse = errorDef.DATABASE_ISSUE;
            errorResponse.error = reason;
            return res.status(400).send(errorResponse);
        })
});


module.exports = router;