const errorCodes = require("./error.codes");

function parameterHandler(params) {
    if (params.length <= 0) {
        throw errorCodes.INVALID_PARAMETER;
    }

    for (let t = 0; t < params.length; t++) {
        if (!params[t] && params[t] != 0) {
            throw errorCodes.INVALID_PARAMETER;
        }
    }

}

function errorResponseHandler(err, req, res, next) {

    let errorInfo = compileError(err);
    const message = {...errorInfo};
    delete message.status;
    return res.status(errorInfo.status).send(message);

}

function compileError(err) {
    if (err.status && err.code) {
        let _err = Object.assign({}, err);
        delete _err.status;

        return {
            status: err.status,
            message: _err
        };
    }
  
    if (err.name && err.name == 'SequelizeUniqueConstraintError') {
        return errorCodes.DUPLICATE_EMAIL;
    }


    if (err.errorInfo) {
        return {
            status: 400,
            message: err.errorInfo
        };
    }

    return {
        status: 500,
        message: {
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
            error: err.stack
        }
    };
}

function errorClientHandler(req, res, next) {
    let _err = Object.assign({}, errorCodes.NOT_FOUND);
    delete _err.status;
    res.status(errorCodes.NOT_FOUND.status).send(_err);
}

module.exports = {
    ...errorCodes,
    parameterHandler,
    errorResponseHandler,
    errorClientHandler,
    compileError
};