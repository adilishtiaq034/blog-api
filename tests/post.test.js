const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Post = require('../models/postModel')
const User = require('../models/userModel')

describe('Blog Posts', () => {

    let token
    let user

    beforeAll(async () => {
        await mongoose.connect(process.env.mongodb_test_uri)
    })

    beforeEach(async () => {

        await mongoose.connection.db.dropDatabase()

        // Create test user
        const registerResponse = await request(app)
            .post('/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            })

        user = registerResponse.body.user

        // Login test user
        const loginResponse = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            })

        token = loginResponse.body.token
    })


    // --------------------------------------------------
    // GET ALL POSTS
    // --------------------------------------------------

    test('GET /blog/posts should return all blog posts', async () => {

        await Post.create([
            {
                title: 'JavaScript Basics',
                content: 'Learning JavaScript',
                category: 'technology',
                author: user._id
            },
            {
                title: 'Cricket World',
                content: 'Latest cricket news',
                category: 'sports',
                author: user._id
            }
        ])

        const response = await request(app)
            .get('/blog/posts')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBe(2)
    })


    // --------------------------------------------------
    // PAGINATION
    // --------------------------------------------------

    test('GET /blog/posts should support pagination', async () => {

        await Post.create([
            {
                title: 'Post 1',
                content: 'Content 1',
                category: 'technology',
                author: user._id
            },
            {
                title: 'Post 2',
                content: 'Content 2',
                category: 'technology',
                author: user._id
            },
            {
                title: 'Post 3',
                content: 'Content 3',
                category: 'technology',
                author: user._id
            },
            {
                title: 'Post 4',
                content: 'Content 4',
                category: 'technology',
                author: user._id
            }
        ])

        const response = await request(app)
            .get('/blog/posts')
            .query({
                page: 1,
                limit: 2
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(2)
    })


    // --------------------------------------------------
    // INVALID PAGINATION
    // --------------------------------------------------

    test('GET /blog/posts should reject negative page and limit', async () => {

        const response = await request(app)
            .get('/blog/posts')
            .query({
                page: -1,
                limit: -2
            })

        expect(response.statusCode).toBe(400)
    })


    // --------------------------------------------------
    // CATEGORY FILTER
    // --------------------------------------------------

    test('GET /blog/posts should filter posts by category', async () => {

        await Post.create([
            {
                title: 'JavaScript',
                content: 'JS content',
                category: 'technology',
                author: user._id
            },
            {
                title: 'Football',
                content: 'Football content',
                category: 'sports',
                author: user._id
            },
            {
                title: 'MongoDB',
                content: 'MongoDB content',
                category: 'technology',
                author: user._id
            }
        ])

        const response = await request(app)
            .get('/blog/posts')
            .query({
                category: 'technology'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(2)

        response.body.forEach(post => {
            expect(post.category).toBe('technology')
        })
    })


    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    test('GET /blog/posts should search posts', async () => {

        await Post.create([
            {
                title: 'Learning JavaScript',
                content: 'JavaScript is great',
                category: 'technology',
                author: user._id
            },
            {
                title: 'Learning MongoDB',
                content: 'MongoDB database',
                category: 'technology',
                author: user._id
            }
        ])

        const response = await request(app)
            .get('/blog/posts')
            .query({
                search: 'JavaScript'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)

        expect(
            response.body.some(post =>
                post.title.includes('JavaScript')
            )
        ).toBe(true)
    })


    // --------------------------------------------------
    // GET SINGLE POST
    // --------------------------------------------------

    test('GET /blog/posts/:id should return a specific post', async () => {

        const post = await Post.create({
            title: 'Test Post',
            content: 'Test Content',
            category: 'technology',
            author: user._id
        })

        const response = await request(app)
            .get(`/blog/posts/${post._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe('Test Post')
        expect(response.body.content).toBe('Test Content')
    })


    // --------------------------------------------------
    // NON-EXISTENT POST
    // --------------------------------------------------

    test('GET /blog/posts/:id should return 404 for non-existent post', async () => {

        const fakeId = new mongoose.Types.ObjectId()

        const response = await request(app)
            .get(`/blog/posts/${fakeId}`)

        expect(response.statusCode).toBe(404)
    })


    // --------------------------------------------------
    // INVALID ID
    // --------------------------------------------------

    test('GET /blog/posts/:id should reject invalid ID', async () => {

        const response = await request(app)
            .get('/blog/posts/123')

        expect(response.statusCode).toBe(400)
    })


    // --------------------------------------------------
    // CREATE POST
    // --------------------------------------------------

    test('POST /blog/posts should create a post with valid authentication', async () => {

        const response = await request(app)
            .post('/blog/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Post',
                content: 'This is a test post.',
                category: 'technology'
            })

        expect(response.statusCode).toBe(201)

        expect(response.body.title).toBe('Test Post')

        const post = await Post.findOne({
            title: 'Test Post'
        })

        expect(post).not.toBeNull()
    })


    // --------------------------------------------------
    // INVALID POST DATA
    // --------------------------------------------------

    test('POST /blog/posts should reject invalid data', async () => {

        const response = await request(app)
            .post('/blog/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: '',
                content: 'This is a test post.',
                category: 'technology'
            })

        expect(response.statusCode).toBe(400)
    })


    // --------------------------------------------------
    // NO AUTHENTICATION
    // --------------------------------------------------

    test('POST /blog/posts should reject unauthenticated users', async () => {

        const response = await request(app)
            .post('/blog/posts')
            .send({
                title: 'Test Post',
                content: 'This is a test post.',
                category: 'technology'
            })

        expect(response.statusCode).toBe(401)
    })


    // --------------------------------------------------
    // INVALID TOKEN
    // --------------------------------------------------

    test('POST /blog/posts should reject invalid token', async () => {

        const response = await request(app)
            .post('/blog/posts')
            .set('Authorization', 'Bearer invalid_jwt_token')
            .send({
                title: 'Test Post',
                content: 'This is a test post.',
                category: 'technology'
            })

        expect(response.statusCode).toBe(401)
    })


    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
    })

})