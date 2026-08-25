const request = require('supertest')
const app = require('../app')

describe('Blog Posts', () => {

    test('/get /blog should return all blog posts', async()=>{

        const response = await request(app)
        .get('/blog/posts')

        expect(response.statusCode).toBe(200)
        console.log(response.body)
    })












})