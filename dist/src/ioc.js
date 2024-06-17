"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const users_repository_1 = require("./features/users/repository/users.repository");
const comments_repository_1 = require("./features/comments/repository/comments.repository");
const comments_service_1 = require("./features/comments/service/comments.service");
const comments_controller_1 = require("./features/comments/comments.controller");
const jwtService_1 = require("./common/adapters/jwtService");
const usersQuery_repository_1 = require("./features/users/repository/usersQuery.repository");
const commentsQuery_repository_1 = require("./features/comments/repository/commentsQuery.repository");
const users_service_1 = require("./features/users/service/users.service");
const bcrypt_service_1 = require("./common/adapters/bcrypt.service");
const auth_service_1 = require("./features/auth/service/auth.service");
const devices_repository_1 = require("./features/securityDevices/repository/devices.repository");
const email_service_1 = require("./common/adapters/email.service");
const devicesService_1 = require("./features/securityDevices/service/devicesService");
const devices_queryRepository_1 = require("./features/securityDevices/repository/devices.queryRepository");
const posts_service_1 = require("./features/posts/service/posts.service");
const blogs_repository_1 = require("./features/blogs/repository/blogs.repository");
const posts_repository_1 = require("./features/posts/repository/posts.repository");
const postsQuery_repository_1 = require("./features/posts/repository/postsQuery.repository");
const blogs_service_1 = require("./features/blogs/sevice/blogs.service");
exports.container = new inversify_1.Container();
exports.container.bind(comments_service_1.CommentsService).to(comments_service_1.CommentsService);
exports.container.bind(users_service_1.UsersService).to(users_service_1.UsersService);
exports.container.bind(auth_service_1.AuthService).to(auth_service_1.AuthService);
exports.container.bind(devicesService_1.DevicesService).to(devicesService_1.DevicesService);
exports.container.bind(blogs_service_1.BlogsService).to(blogs_service_1.BlogsService);
exports.container.bind(jwtService_1.JwtService).to(jwtService_1.JwtService);
exports.container.bind(bcrypt_service_1.BcryptService).to(bcrypt_service_1.BcryptService);
exports.container.bind(email_service_1.EmailService).to(email_service_1.EmailService);
exports.container.bind(posts_service_1.PostsService).to(posts_service_1.PostsService);
exports.container.bind(comments_controller_1.CommentsController).to(comments_controller_1.CommentsController);
exports.container.bind(comments_repository_1.CommentsRepository).to(comments_repository_1.CommentsRepository);
exports.container.bind(users_repository_1.UsersRepository).to(users_repository_1.UsersRepository);
exports.container.bind(devices_repository_1.DevicesRepository).to(devices_repository_1.DevicesRepository);
exports.container.bind(blogs_repository_1.BlogsRepository).to(blogs_repository_1.BlogsRepository);
exports.container.bind(posts_repository_1.PostsRepository).to(posts_repository_1.PostsRepository);
exports.container.bind(usersQuery_repository_1.UsersQueryRepository).to(usersQuery_repository_1.UsersQueryRepository);
exports.container.bind(commentsQuery_repository_1.CommentsQueryRepository).to(commentsQuery_repository_1.CommentsQueryRepository);
exports.container.bind(devices_queryRepository_1.DevicesQueryRepository).to(devices_queryRepository_1.DevicesQueryRepository);
exports.container.bind(postsQuery_repository_1.PostsQueryRepository).to(postsQuery_repository_1.PostsQueryRepository);