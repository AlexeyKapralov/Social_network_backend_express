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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const db_1 = require("../../../src/db/db");
const login_service_1 = require("../../../src/service/login.service");
const globals_1 = require("@jest/globals");
const bcrypt_service_1 = require("../../../src/common/adapters/bcrypt.service");
const userManager_test_1 = require("../../e2e/users/userManager.test");
const authManager_test_1 = require("../../e2e/auth/authManager.test");
const settings_1 = require("../../../src/common/config/settings");
const resultStatus_type_1 = require("../../../src/common/types/resultStatus.type");
const users_repository_1 = require("../../../src/repositories/users/users.repository");
describe('Authentication User', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        yield db_1.db.run(uri);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.db.drop();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.useRealTimers();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.db.stop();
    }));
    afterAll(done => {
        done();
    });
    it('should login user', () => __awaiter(void 0, void 0, void 0, function* () {
        users_repository_1.usersRepository.findUserWithPass = globals_1.jest.fn().mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
            return {
                _id: 'id',
                login: 'login',
                email: 'email',
                createdAt: new Date().toISOString(),
                password: '123',
                confirmationCode: '12345',
                confirmationCodeExpired: new Date(),
                isConfirmed: true
            };
        }));
        bcrypt_service_1.bcryptService.comparePasswordsHash = globals_1.jest.fn()
            .mockImplementation((reqPassPlainText, dbPassHash) => __awaiter(void 0, void 0, void 0, function* () {
            return true;
        }));
        const result = yield login_service_1.loginService.loginUser({ loginOrEmail: 'login', password: '123' }, 'Chrome', '0.0.0.1');
        expect(users_repository_1.usersRepository.findUserWithPass).toHaveBeenCalled();
        expect(users_repository_1.usersRepository.findUserWithPass).toHaveBeenCalledTimes(1);
        expect(result.data).toEqual({
            accessToken: expect.stringMatching(/^([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)$/),
            refreshToken: expect.stringMatching(/^([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)$/)
        });
    }));
    it('should update refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            login: 'login',
            email: 'email@mail.ru',
            password: '123456'
        };
        yield userManager_test_1.userManagerTest.createUser(user, settings_1.SETTINGS.ADMIN_AUTH);
        const loginInputData = {
            loginOrEmail: user.login,
            password: user.password
        };
        const tokens = yield authManager_test_1.authManagerTest.authUser(loginInputData);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        const result = yield login_service_1.loginService.refreshToken(tokens.refreshToken);
        expect(tokens.refreshToken).not.toBe(result.data.refreshToken);
    }));
    it(`shouldn't update refresh token after expired time`, () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            login: 'login',
            email: 'email@mail.ru',
            password: '123456'
        };
        yield userManager_test_1.userManagerTest.createUser(user, settings_1.SETTINGS.ADMIN_AUTH);
        const loginInputData = {
            loginOrEmail: user.login,
            password: user.password
        };
        const tokens = yield authManager_test_1.authManagerTest.authUser(loginInputData);
        globals_1.jest.useFakeTimers();
        let result;
        yield new Promise(res => {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                result = yield login_service_1.loginService.refreshToken(tokens.refreshToken);
                res(result);
            }), 30000);
            globals_1.jest.advanceTimersByTime(30000);
        });
        expect(result.status).toBe(resultStatus_type_1.ResultStatus.Unauthorized);
    }));
});
