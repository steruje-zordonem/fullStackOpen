const listHelper = require('../utils/list_helper')



test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes([listHelper.blogs[0]])
        expect(result).toBe(7)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listHelper.blogs)
        expect(result).toBe(36)
    })

})


describe('favourite blog', () => {
    test('if given correct list - returns blog with the most likes', () => {

        const mostLikedBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }

        const result = listHelper.favouriteBlog(listHelper.blogs)
        expect(result).toEqual(mostLikedBlog)
    })
})

describe('Most Blogs', () => {
    test('author with highest number of blogs', () => {

        const bestAuthor = {
            author: "Robert C. Martin",
            blogs: 3
        }

        const result = listHelper.mostBlogs(listHelper.blogs)
        expect(result).toEqual(bestAuthor)
    })
})

describe('Most Likes', () => {
    test('author with most likes', () => {
        const bestAuthor = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }

        const result = listHelper.mostLikes(listHelper.blogs)

        expect(result).toEqual(bestAuthor)
    })
})