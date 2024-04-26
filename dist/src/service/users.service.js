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
exports.usersService = void 0;
const bcrypt_service_1 = require("../common/adapters/bcrypt.service");
const users_repository_1 = require("../repositories/users/users.repository");
const bcrypt = require('bcrypt');
exports.usersService = {
    createUser(data, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield bcrypt_service_1.bcryptService.createPasswordHash(data.password);
            return yield users_repository_1.usersRepository.createUser(data, passwordHash);
        });
    },
    getUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_repository_1.usersRepository.findUsers(query);
        });
    }
};
