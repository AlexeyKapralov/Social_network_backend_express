"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSecurityDeviceByIdController = void 0;
const resultStatus_type_1 = require("../../../common/types/resultStatus.type");
const http_status_codes_1 = require("http-status-codes");
const jwtService_1 = require("../../../common/adapters/jwtService");
const devicesCompositionRoot_1 = require("../devicesCompositionRoot");
const deleteSecurityDeviceByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const userId = jwtService_1.JwtService.getUserIdByToken(refreshToken);
    if (!userId) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send();
        return;
    }
    const result = yield devicesCompositionRoot_1.devicesService.deleteDevice(req.params.deviceId, userId);
    if (result.status === resultStatus_type_1.ResultStatus.Success) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
    }
    if (result.status === resultStatus_type_1.ResultStatus.NotFound) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send();
    }
    if (result.status === resultStatus_type_1.ResultStatus.Forbidden) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send();
    }
    if (result.status === resultStatus_type_1.ResultStatus.Unauthorized) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
    }
});
exports.deleteSecurityDeviceByIdController = deleteSecurityDeviceByIdController;
