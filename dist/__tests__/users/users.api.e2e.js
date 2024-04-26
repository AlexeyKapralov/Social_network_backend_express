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
const db_1 = require("../../src/db/db");
const settings_1 = require("../../src/common/config/settings");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const user_test_manager_1 = require("./user.test.manager");
const http_status_codes_1 = require("http-status-codes");
describe('user tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        yield db_1.db.run(uri);
    }));
    it(`shouldn't create user with auth and incorrect input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            login: 'd',
            password: 'a',
            email: 'waterasdasd@e'
        };
        yield user_test_manager_1.userTestManager.createUser(data, settings_1.SETTINGS.ADMIN_AUTH, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
    it(`shouldn't create user with auth and correct input data`, () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            login: 'WwldYc21wu',
            password: 'string',
            email: 'gHVEtCudxVZoK6ETpak74_r4X6TF-Yjyr-16FPZBouaMivMioRm21fgOP9RsaUHKqiit@oOxUwm6fKkBjstdw-wSawULg8PmBk9lAV06XQr9RE6aw_S9n5Is9qnLZweVHOwijtrgHhXuz7YjZ9PTChhkfYly4gq1Q1g2nz4o.dFIw'
        };
        yield user_test_manager_1.userTestManager.createUser(data, 'no_valid_credentials', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }));
    it('should create user with auth and correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            login: 'WwldYc21wu',
            password: 'string',
            email: 'asw@mail.ru'
        };
        yield user_test_manager_1.userTestManager.createUser(data, settings_1.SETTINGS.ADMIN_AUTH);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        db_1.db.stop();
    }));
    afterAll(done => {
        done();
    });
});