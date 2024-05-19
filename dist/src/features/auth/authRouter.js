"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const loginController_1 = require("./controllers/loginController");
const getUserInfo_1 = require("./controllers/getUserInfo");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const express_validation_1 = require("../../common/validation/express-validation");
const inputValidation_middleware_1 = require("../../middlewares/inputValidation.middleware");
const registration_controller_1 = require("./controllers/registration.controller");
const registrationConfirmation_controller_1 = require("./controllers/registrationConfirmation.controller");
const emailResending_controller_1 = require("./controllers/emailResending.controller");
const refreshToken_controller_1 = require("./controllers/refreshToken.controller");
const logout_controller_1 = require("./controllers/logout.controller");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/login', express_validation_1.loginOrEmailValidation, express_validation_1.passwordValidation, inputValidation_middleware_1.inputValidationMiddleware, loginController_1.loginController);
exports.authRouter.post('/logout', logout_controller_1.logoutController);
exports.authRouter.post('/refresh-token', refreshToken_controller_1.refreshTokenController);
exports.authRouter.post('/registration', express_validation_1.loginValidation, express_validation_1.passwordValidation, express_validation_1.emailValidationForRegistration, inputValidation_middleware_1.inputValidationMiddleware, registration_controller_1.registrationController);
exports.authRouter.post('/registration-confirmation', express_validation_1.codeValidation, inputValidation_middleware_1.inputValidationMiddleware, registrationConfirmation_controller_1.registrationConfirmationController);
exports.authRouter.post('/registration-email-resending', express_validation_1.emailValidationForResend, inputValidation_middleware_1.inputValidationMiddleware, emailResending_controller_1.emailResendingController);
exports.authRouter.get('/me', auth_middleware_1.authMiddleware, getUserInfo_1.getUserInfoController);
