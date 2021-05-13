import blogService from '../services/blogs'

export const createBlog = blog => {
    return {
        type: 'NEW_BLOG',
        data: blog,
    }
}

export const updateBlog = (id, updatedBlog) => {
    return {
        type: 'UPDATE_BLOG',
        data: {
            id,
            updatedBlog
        }
    }
}

export const removeBlog = id => {
    return {
        type: 'REMOVE_BLOG',
        data: { id }
    }
}

export const initializeBlogs = blogs => {
    return {
        type: 'INIT_BLOGS',
        data: blogs,
    }
}

export const addCommentToState = (id, comment) => {
    return async dispatch => {
        console.log('Inside dispatch: ', comment, id)
        const updatedBlog = await blogService.addComment(id, comment)
        console.log('Updated blog fetched from server', updatedBlog)
        dispatch({
            type: 'ADD_COMMENT',
            data: updatedBlog
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'NEW_BLOG':
        return state.concat(action.data)
    case 'UPDATE_BLOG': {
        const id = action.data.id
        const updatedBlog = action.data.updatedBlog

        return state.map(blog =>
            blog.id !== id ? blog : updatedBlog
        )
    }
    case 'REMOVE_BLOG': {
        const id = action.data.id
        return state.filter(blog => blog.id !== id)
    }
    case 'INIT_BLOGS':
        return action.data
    case 'ADD_COMMENT': {
        const updatedBlog = action.data
        console.log('Updated blog inside state', updatedBlog)
        return state.map(blog =>
            blog.id !== updatedBlog.id ? blog : updatedBlog
        )
    }

    default:
        return state
    }
}

export default blogReducer