module.exports = {
    USER_NOT_FOUND: {
        status: 400,
        code: "USER_NOT_FOUND",
        message: "User does not exist"
    },
    UPDATE_FAILED: {
        status: 400,
        code: "UPDATE_FAILED",
        message: "Failed to update record"
    },
    INVALID_PARAMETER: {
        status: 400,
        code: "INVALID_PARAMETER",
        message: "Parameters given are either missing or invalid"
    },
    TOKEN_EXPIRED: {
        status: 401,
        code: "TOKEN_EXPIRED",
        message: "Token session has expired"
    },
    INVALID_USERINFO: {
        status: 400,
        code: "INVALID_USERINFO",
        message: "Userinfo from token has expired or invalid"
    },
    NOT_UNIQUE: {
        status: 400,
        code: "NOT_UNIQUE",
        message: "Record is not unique."
    },
    RECORD_NOT_FOUND: {
        status: 400,
        code: "RECORD_NOT_FOUND",
        message: "Record with given id does not exist."
    },
    NOT_FOUND: {
        status: 404,
        code: "NOT_FOUND",
        message: "URL does not exist"
    },
    DATABASE_ISSUE: {
        status: 400,
        code: "DATABASE_ISSUE",
        message: "Database issue or invalid query execution."
    },
    INVALID_OPTION: {
        status: 400,
        code: "INVALID_OPTION",
        message: "Option parameter is invalid."
    },
    DUPLICATE_EMAIL: {
        status: 400,
        code: "DUPLICATE_EMAIL",
        message: "Email is already in use"
    },
    INVALID_COUPON: {
        status: 400,
        code: "INVALID_COUPON",
        message: "Invalid coupon code"
    },
    INVALID_INVOICE: {
        status: 400,
        code: "INVALID_INVOICE",
        message: "Invalid invoice calculation"
    },
}