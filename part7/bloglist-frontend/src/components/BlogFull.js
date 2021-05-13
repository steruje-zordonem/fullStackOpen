import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { addCommentToState } from '../reducers/blogReducer'


const Comments = ({ blog }) => {
    const dispatch = useDispatch()

    const addComment = event => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        dispatch(addCommentToState(blog.id, comment))
    }

    return (
        <div>
            <h2>comments</h2>
            <form onSubmit={addComment}>
                <input name='comment' />
                <button type='submit'>add comment</button>
            </form>
            <ul>
                {blog.comments.map(comment =>
                    comment
                        ? <li key={Math.random() * 1000 * comment.length}>{comment}</li>
                        : null
                )}
            </ul>
        </div>
    )
}

const BlogFull = ({ loggedUser, updateBlog, removeBlog }) => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    if (!blog) {
        return null
    }

    const addLike = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        updateBlog(updatedBlog.id, updatedBlog)
    }

    return (
        <div className='fullContent'>
            <div>
                <h1>{blog.title} {blog.author}</h1>
                <a href={`//${blog.url}`} target='_blank' rel='noreferrer'>{blog.url}</a>
                <div id='likes'>
                    likes: {blog.likes}
                    <button id='likeBtn' onClick={addLike}>like</button>
                </div>
                {blog.user === undefined ? '' : <p>{blog.user.name}</p>}
                {loggedUser.name === blog.user.name
                    ? <button id='deleteBlogBtn' onClick={() => removeBlog(blog.id, blog)}>remove</button>
                    : null
                }
                <Comments blog={blog} />
            </div>
        </div>
    )
}

export default BlogFull