import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        // Create new blog
        const newBlog = { title, author, url }
        // Add new blog to the server (using function from main component)
        createBlog(newBlog)
        // Clean form inputs after adding new blog
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className='formDiv'>
            <h2>create new</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        id="title"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        id="author"
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id="url"
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="create-blog-button" type="submit">create</button>
            </form>
        </div>

    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm