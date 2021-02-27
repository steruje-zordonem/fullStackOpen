const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = listHelper.blogs_short.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('unique identifier of blog post is named \'id\'', async () => {
    const blogsInDb = await listHelper.blogsInDb()

    expect(blogsInDb[0].id).toBeDefined()
})

describe('when there is initially some notes saved', () => {

    test('all notes are returned', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await listHelper.blogsInDb()

        expect(blogsInDb).toHaveLength(listHelper.blogs_short.length)
    })
})

describe('addition of a note', () => {
    test('new valid blog can be added to the backend', async () => {
        const blogsAtStart = await listHelper.blogsInDb()

        const token = await listHelper.getToken()

        const newBlog = {
            title: 'BJJ Globtrotters',
            author: 'Eddie Bravo',
            url: 'https://www.bjjglobetrotters.com/blogs/',
            likes: 7,
        }

        //  HTTP POST request to the /api/blogs url successfully creates a new blog post.
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await listHelper.blogsInDb()
        const blogTitles = blogsAtEnd.map(blog => blog.title)

        // verify that the total number of blogs in the system is increased by one
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

        //  verify that the content of the blog post is saved correctly to the database.
        expect(blogTitles).toContain('BJJ Globtrotters')

    })

    test('if likes property is missing from request, it will default value to 0', async () => {
        const blogsAtStart = await listHelper.blogsInDb()

        const token = await listHelper.getToken()

        const newBlog = {
            title: 'BJJ Globtrotters',
            author: 'Eddie Bravo',
            url: 'https://www.bjjglobetrotters.com/blogs/'
        }

        const returnedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)

        const blogsAtEnd = await listHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
        expect(returnedBlog.body.likes).toEqual(0)
    })

    test('if \'title\' and \'url\' properties are missing, backend responds with status code 400', async () => {
        const blogsAtStart = await listHelper.blogsInDb()

        const token = await listHelper.getToken()

        const newBlog = {
            author: 'Eddie Bravo'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)

        const blogsAtEnd = await listHelper.blogsInDb()

        expect(blogsAtEnd).toEqual(blogsAtStart)
    })

    test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided.', async () => {
        const blogsAtStart = await listHelper.blogsInDb()
        
        const newBlog = {
            title: 'BJJ Globtrotters',
            author: 'Eddie Bravo',
            url: 'https://www.bjjglobetrotters.com/blogs/',
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await listHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    })
})

describe('deletion of a blog', () => {
    test('succeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await listHelper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const token = await listHelper.getToken()

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await listHelper.blogsInDb()
        const blogTitles = blogsAtEnd.map(blog => blog.title)

        expect(blogTitles).not.toContain(blogToDelete.title)
    })
})

describe('update of a blog', () => {
    test('succeds with status code 200 when blog is updated', async () => {
        const blogs = await listHelper.blogsInDb()
        const blogToUpdate = blogs[0]

        const updatedBlog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 22,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAfterUpdate = await listHelper.blogsInDb()
        expect(blogsAfterUpdate[0].likes).toEqual(updatedBlog.likes)
    })
})


afterAll(() => {
    mongoose.connection.close()
})