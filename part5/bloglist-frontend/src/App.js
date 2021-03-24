import React, { useEffect, useState, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const blogFormRef = useRef()


    // Fetch blogs from the server (on 1st render)
    useEffect(() => {
        const fetchMyBlogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }

        fetchMyBlogs()
    }, [])

    // Check if user is not already logged in (check Local Storage)
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // Sort blogs by number of likes from highest to lowest number
    const sortedBlogs = () => {
        // create sorting functions
        const compare = (a, b) => {
            return b.likes - a.likes
        }
        // create copy of a blogs to not mutate React state
        const blogsToSort = [...blogs]
        // sort this copy of blogs and return it
        return blogsToSort.sort(compare)
    }



    // Login form submission
    const handleLoginForm = async credentials => {
        try {
            // Get logged in user data from server and add to 'user' variable
            const user = await loginService.login(credentials)
            // Add user to the Local Storage (to keep him logged in)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            // Set token for dealing with new blogs
            blogService.setToken(user.token)
            // Add user to the set variable
            setUser(user)
        } catch (exception) {
            setMessage('Wrong username or password')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    // Adding new blog form submission
    const createBlog = async newBlog => {
        try {
            // First of all hide the form for adding new blog
            blogFormRef.current.toggleVisibility()
            // Add new blog to the server
            const addedBlog = await blogService.create(newBlog)
            // Save added blog to state variable 'blogs'
            setBlogs(blogs.concat(addedBlog))
            // Show positive notification to the user
            setMessage(`A new blog '${addedBlog.title}' by ${addedBlog.author} added.`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            // If things went wrong show negative notification to the user
            setMessage('Wrong data provided')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const updateBlog = async (id, updatedBlog) => {
        try {
            // update blog on the server
            const savedBlog = await blogService.update(id, updatedBlog)
            // update list of blogs
            setBlogs(blogs.map(blog => blog.id !== id ? blog : savedBlog))

        } catch (exception) {
            console.log(exception)
        }
    }

    const removeBlog = async (id, blog) => {
        try {
            const shouldRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author} ??`)
            if (shouldRemove) {
                await blogService.remove(id)
                setBlogs(blogs.filter(blog => blog.id !== id))
            }
        } catch (exception) {
            // If things went wrong show negative notification to the user
            console.log(exception)
            setMessage('Wrong id')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    // Handle logout - remove user from localStorage
    const handleLogoutBtn = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }


    /* ~~~~~~~~~~~ FORMS ~~~~~~~~~~~~~ */

    // New Blog form
    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
        </Togglable>
    )

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                handleLoginForm={handleLoginForm}
            />
        </Togglable>
    )


    /* ~~~~~~~~~~~ RENDER COMPONENTS ~~~~~~~~~~~~~ */
    return (
        <div>
            <h1>blogs</h1>
            <Notification message={message} />
            {user === null ?
                loginForm() :
                <div>
                    {user.name} logged in.
                    <button id='logout-button' type="submit" onClick={handleLogoutBtn}>logout</button>
                    {blogForm()}
                </div>
            }
            <h2>blogs</h2>
            {sortedBlogs().map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    loggedUser={user}
                    updateBlog={updateBlog}
                    removeBlog={removeBlog}
                />
            )}
        </div>
    )
}

export default App
