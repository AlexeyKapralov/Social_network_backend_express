"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validation_1 = require("../../common/validation/express-validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const inputValidation_middleware_1 = require("../../middlewares/inputValidation.middleware");
const ioc_1 = require("../../ioc");
const posts_controller_1 = require("./posts.controller");
exports.postsRouter = (0, express_1.Router)({});
const postsController = ioc_1.container.resolve(posts_controller_1.PostsController);
// postsRouter.get('/:id/like-status',
//     postsController.likeStatus.bind(postsController)
// )
exports.postsRouter.get('/:id/comments', express_validation_1.pageNumberValidation, express_validation_1.pageSizeValidation, express_validation_1.sortByValidation, express_validation_1.sortDirectionValidation, postsController.getComments.bind(postsController));
exports.postsRouter.post('/:postId/comments', auth_middleware_1.authMiddleware, express_validation_1.contentCommentValidation, inputValidation_middleware_1.inputValidationMiddleware, postsController.createCommentForPost.bind(postsController));
exports.postsRouter.get('/', express_validation_1.pageNumberValidation, express_validation_1.pageSizeValidation, express_validation_1.sortByValidation, express_validation_1.sortDirectionValidation, postsController.getPosts.bind(postsController));
exports.postsRouter.post('/', auth_middleware_1.authMiddleware, express_validation_1.titleValidation, express_validation_1.shortDescriptionValidation, express_validation_1.contentValidation, express_validation_1.blogIdInBodyValidation, inputValidation_middleware_1.inputValidationMiddleware, postsController.createPost.bind(postsController));
exports.postsRouter.get('/:id', express_validation_1.postIdValidation, inputValidation_middleware_1.inputValidationMiddleware, postsController.getPostById.bind(postsController));
exports.postsRouter.put('/:id', auth_middleware_1.authMiddleware, express_validation_1.blogIdInBodyValidation, express_validation_1.contentValidation, express_validation_1.titleValidation, express_validation_1.shortDescriptionValidation, inputValidation_middleware_1.inputValidationMiddleware, postsController.updatePostById.bind(postsController));
exports.postsRouter.delete('/:id', auth_middleware_1.authMiddleware, express_validation_1.titleValidation, postsController.deletePost.bind(postsController));
