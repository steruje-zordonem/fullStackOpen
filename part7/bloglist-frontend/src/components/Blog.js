import React from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



const Blog = ({ blog }) => {


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (!blog) {
        return null
    }


    return (
        <div style={blogStyle} className='blog'>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
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