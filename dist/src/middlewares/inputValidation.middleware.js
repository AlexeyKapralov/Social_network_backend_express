"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const inputValidationMiddleware = (req, res, next) => {
    const myValidationResult = express_validator_1.validationResult.withDefaults({
        formatter: error => {
            const curError = error;
            return {
                message: curError.msg,
                field: curError.path
            };
        }
    });
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ errorsMessages: errors.array({ onlyFirstError: true }) });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
