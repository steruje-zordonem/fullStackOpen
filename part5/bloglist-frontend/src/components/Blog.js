import React, { useState } from 'react'
//import PropTypes from 'prop-types'



const Blog = ({ blog, loggedUser, updateBlog, removeBlog }) => {
    const [fullInfo, setFullinfo] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggle = () => {
        setFullinfo(!fullInfo)
    }

    const addLike = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        updateBlog(updatedBlog.id, updatedBlog)
    }

    const basicInformation = () => (
        <div className='basicContent'>
            {blog.title} {blog.author}
            <button onClick={toggle}>view</button>
        </div>
    )


    const fullInformation = () => (
        <div className='fullContent'>
            <div>
                {blog.title} {blog.author}
                <button onClick={toggle}>hide</button>
                <p>{blog.url}</p>
                <div id='likes'>
                    likes: {blog.likes}
                    <button id='likeBtn' onClick={addLike}>like</button>
                </div>
                {blog.user === undefined ? '' : <p>{blog.user.name}</p>}
                {loggedUser.name === blog.user.name
                    ? <button id='deleteBlogBtn' onClick={() => removeBlog(blog.id, blog)}>remove</button>
                    : null
                }
            </div>
        </div>
    )

    return (
        <div style={blogStyle} className='blog'>
            {fullInfo
                ? fullInformation()
                : basicInformation()
            }
        </div>
    )
}

/*
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    loggedUser: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    removeBlog:PropTypes.func.isRequired,
}
*/

export default Blog