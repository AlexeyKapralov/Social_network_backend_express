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
exports.userManagerTest = void 0;
const supertest_1 = require("supertest");
const app_1 = require("../../../src/app");
const http_status_codes_1 = require("http-status-codes");
const mongodb_1 = require("mongodb");
const date_fns_1 = require("date-fns");
const path_1 = require("../../../src/common/config/path");
const user_entity_1 = require("../../../src/features/users/domain/user.entity");
const getRandomName = () => {
    const names = ["John", "Alice", "Bob", "Eva", "Michael", "Emma", "David", "Sophia", "James", "Olivia"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
};
exports.userManagerTest = {
    /**
     * login: 'login' password: 'qwert1234' email: 'asdf@mail.ru'
     *
     * **/
    createUser() {
        return __awaiter(this, arguments, void 0, function* (data = 'default', auth = '', expected_status = http_status_codes_1.StatusCodes.CREATED) {
            if (data === 'default') {
                data = {
                    login: 'login',
                    password: 'qwert1234',
                    email: 'as@mail.ru'
                };
            }
            const buff = Buffer.from(auth, 'utf-8');
            const decodedAuth = buff.toString('base64');
            const result = yield (0, supertest_1.agent)(app_1.app)
                .post(path_1.PATH.USERS)
                .send(data)
                .set({ authorization: `Basic ${decodedAuth}` });
            expect(result.status).toBe(expected_status);
            if (result.status === http_status_codes_1.StatusCodes.CREATED) {
                expect(result.body).toEqual({
                    login: data.login,
                    email: data.email,
                    createdAt: expect.any(String),
                    id: expect.any(String)
                });
            }
            return result.body;
        });
    },
    createUsers(count) {
        return __awaiter(this, void 0, void 0, function* () {
            // let users = [];
            for (let i = 0; i < count; i++) {
                let user = {
                    _id: new mongodb_1.ObjectId().toString(),
                    login: getRandomName() + i, // Добавляем к имени номер
                    email: `generatedEmail${i}@example.com`,
                    createdAt: new Date().toISOString(),
                    password: `generatedPassword${i}`,
                    isConfirmed: false,
                    confirmationCodeExpired: (0, date_fns_1.add)(new Date(), { hours: 1 }),
                    confirmationCode: 'abcd'
                };
                // users.push(user);
                // users = [...users, user];
                yield user_entity_1.UsersModel.create(user);
            }
        });
    },
    deleteUser(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, auth = '', expected_status = http_status_codes_1.StatusCodes.NO_CONTENT) {
            const buff = Buffer.from(auth, 'utf-8');
            const decodedAuth = buff.toString('base64');
            const result = yield (0, supertest_1.agent)(app_1.app)
                .delete(`${path_1.PATH.USERS}/${id}`)
                .set({ authorization: `Basic ${decodedAuth}` });
            expect(result.status).toBe(expected_status);
            if (result.status === http_status_codes_1.StatusCodes.NO_CONTENT) {
                const res = yield user_entity_1.UsersModel.findOne({ _id: id });
                expect(res).toBe(null);
            }
        });
    },
    customSort(array, key, type = 'string', order = 'asc') {
        return array.sort((a, b) => {
            const valueA = (type === 'string') ? a[key].toLowerCase() : a[key];
            const valueB = (type === 'string') ? b[key].toLowerCase() : b[key];
            if (valueA < valueB) {
                return (order === 'asc') ? -1 : 1;
            }
            if (valueA > valueB) {
                return (order === 'asc') ? 1 : -1;
            }
            return 0;
        });
    }
};
