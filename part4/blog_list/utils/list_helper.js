const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const dummy = (blogs) => {
    return 1
}

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    }, {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const blogs_short = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "603a8e21eb9fc11b5854a8da"
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: "603a8e21eb9fc11b5854a8da"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getToken = async () => {
    const user = await User.findOne({ username: 'root' })

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return token
}

const nonexistingId = async () => {
    const newBlog = new Blog({
        title: "will be removed soon",
        author: "me",
        url: "https://hehehe.com/",
    })

    await newBlog.save()
    await newBlog.remove()

    return newBlog._id.toString()
}

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blogs => blogs.likes))
    const blog = blogs.find(blog => blog.likes === mostLikes)

    const copyOfBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }

    return copyOfBlog
}

const mostBlogs = (bloglist) => {

    // Create array of authors (without duplicates)
    let authors = bloglist.map(blog => blog.author)
    authors = [...new Set(authors)]

    // Create array of number of blogs per author and fill it with zeros
    const numOfBlogs = new Array(authors.length).fill(0)

    // Go through all blogs in bloglist and for each author that was found add +1 blog in 'numOfBlogs'
    bloglist.forEach(blog => {
        const index = authors.indexOf(blog.author)
        numOfBlogs[index]++
    })

    // Find index of author with highest number of blogs
    const max = Math.max(...numOfBlogs)
    console.log('max:', max)
    const indexOfMax = numOfBlogs.indexOf(max)

    // Create author with highest number of blogs and return it
    const bestAuthor = {
        author: authors[indexOfMax],
        blogs: numOfBlogs[indexOfMax]
    }

    return bestAuthor
}

const mostLikes = (bloglist) => {
    // Create array of authors (without duplicates)
    let authors = bloglist.map(blog => blog.author)
    authors = [...new Set(authors)]

    // Create array of number of likes per author and fill it with zeros
    const numOfLikes = new Array(authors.length).fill(0)

    // Go through all blogs in bloglist and for each author that was found add likes in 'numOfLikes'
    bloglist.forEach(blog => {
        const index = authors.indexOf(blog.author)
        numOfLikes[index] += blog.likes
    })

    // Find index of author with most likes
    const max = Math.max(...numOfLikes)
    const indexOfMax = numOfLikes.indexOf(max)

    // Create author with highest number of blogs and return it
    const bestAuthor = {
        author: authors[indexOfMax],
        likes: numOfLikes[indexOfMax]
    }
    return bestAuthor
}


module.exports = {
    blogs,
    blogs_short,
    blogsInDb,
    usersInDb,
    getToken,
    nonexistingId,
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}