import {db} from "../../../src/db/db";
import {MongoMemoryServer} from "mongodb-memory-server";
import {commentsManagerTest} from "./commentsManager.test";
import {agent} from "supertest";
import {app} from "../../../src/app";
import {postsManagerTest} from "../posts/postsManager.test";
import {IQueryInputModel, IQueryOutputModel, SortDirection} from "../../../src/common/types/query.model";
import {getCommentView} from "../../../src/features/comments/mappers/commentsMappers";
import {PATH} from "../../../src/common/config/path";
import {CommentsModel} from "../../../src/features/comments/domain/comments.entity";
import {PostModel} from "../../../src/features/posts/domain/post.entity";

describe('comments e2e tests', () => {

    beforeAll(async () => {
        const mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await db.run(uri)
    })

    beforeEach(async () => {
        await db.drop()
        await postsManagerTest.createPosts(1)
    })

    afterAll(async () => {
        await db.stop()
    })
    afterAll(done => {
        done()
    })

    it('should get empty array with default pagination', async () => {
        const posts = await PostModel.find().lean()
        const result = await agent(app)
            .get(`${PATH.POSTS}/${posts[0]._id}/comments`)

        expect(result.body).toEqual({
            "pagesCount": 0,
            "page": 1,
            "pageSize": 10,
            "totalCount": 0,
            "items": []
        })
    })

    it('should get comments array with custom pagination', async () => {
        const posts = await PostModel.find().lean()
        await commentsManagerTest.createComments(25, posts[0]._id.toString())
        const query:IQueryOutputModel = {
            sortBy: 'content',
            sortDirection: SortDirection.ascending,
            pageNumber: 2,
            pageSize: 4
        }
        const result = await agent(app)
            .get(`${PATH.POSTS}/${posts[0]._id}/comments`)
            .query(query)

        const comments = await CommentsModel.find()
            .sort({[query.sortBy!]: query.sortDirection!})
            .limit(query.pageSize!)
            .skip((query.pageNumber! - 1) * query.pageSize!)
            .lean()

        const commentsCount = await CommentsModel.countDocuments()

        expect(result.body).toEqual({
            "pagesCount": Math.ceil( commentsCount / query.pageSize! ),
            "page": query.pageNumber!,
            "pageSize": query.pageSize,
            "totalCount": commentsCount,
            "items": comments.map(i => getCommentView(i))
        })
    })
})