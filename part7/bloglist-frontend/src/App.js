import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogFull from './components/BlogFull'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import {
    createBlog, updateBlog,
    removeBlog, initializeBlogs,
} from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

import {
    BrowserRouter as Router,
    Switch, Route, Link,
} from 'react-router-dom'

import styled from 'styled-components'

const Page = styled.div`
    background: papayawhip;
    color: palevioletred;
`

const Navbar = styled.div`
    margin: 0;
    padding: 10px;
    display: block;
    text-align: left;
    background: LightSeaGreen;
    width: 100%;
    box-sizing: border-box;
`

const Main = styled.div`
    text-align: center;
    margin: 40px auto;
`

const Button = styled.button`
    background: Bisque;
    font-size: 0.9em;d
    padding: 0.25em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
`

const Title = styled.h1`
    font-size: 2.5em;
    font-style: oblique;
    color: Lime;
`



const App = () => {
    const dispatch = useDispatch()

    // Fetch blogs from the server (on 1st render)
    useEffect(() => {
        blogService
            .getAll().then(blogs => dispatch(initializeBlogs(blogs)))
    }, [dispatch])

    // Check if user is not already logged in (check Local Storage)
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setLoggedUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const loggedUser = useSelector(state => state.loggedUser)

    const blogFormRef = useRef()

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
            dispatch(setLoggedUser(user))
        } catch (exception) {
            dispatch(setNotification(
                'Wrong username or password'
            ))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    // Adding new blog form submission
    const createNewBlog = async newBlog => {
        try {
            // First of all hide the form for adding new blog
            blogFormRef.current.toggleVisibility()
            // Add new blog to the server
            const addedBlog = await blogService.create(newBlog)
            // Save added blog to state variable 'blogs'
            dispatch(createBlog(addedBlog))
            // Show positive notification to the user
            dispatch(setNotification(
                `A new blog '${addedBlog.title}' by ${addedBlog.author} added.`
            ))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        } catch (exception) {
            // If things went wrong show negative notification to the user
            dispatch(setNotification(
                'Wrong data provided'
            ))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    const updateTheBlog = async (id, updatedBlog) => {
        try {
            // update blog on the server
            const savedBlog = await blogService.update(id, updatedBlog)
            // update list of blogs
            dispatch(updateBlog(id, savedBlog))
        } catch (exception) {
            console.log(exception)
        }
    }

    const removeTheBlog = async (id, blog) => {
        try {
            const shouldRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author} ??`)
            if (shouldRemove) {
                await blogService.remove(id)
                dispatch(removeBlog(id))
            }
        } catch (exception) {
            // If things went wrong show negative notification to the user
            console.log(exception)
            dispatch(setNotification(
                'Wrong id'
            ))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    // Handle logout - remove user from localStorage
    const handleLogoutBtn = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(setLoggedUser(null))
    }


    /* ~~~~~~~~~~~ FORMS ~~~~~~~~~~~~~ */

    // New Blog form
    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createNewBlog} />
        </Togglable>
    )

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                handleLoginForm={handleLoginForm}
            />
        </Togglable>
    )

    const padding = {
        padding: 5
    }


    /* ~~~~~~~~~~~ RENDER COMPONENTS ~~~~~~~~~~~~~ */
    return (
        <Page>
            <div>
                <Router>
                    <Navbar>
                        <Link style={padding} to='/blogs'>blogs</Link>
                        <Link style={padding} to='/users'>users</Link>
                        {loggedUser !== null
                            ? <em>
                                {loggedUser.name} logged in.
                                <Button id='logout-button' type="submit" onClick={handleLogoutBtn}>logout</Button>
                            </em>
                            : loginForm()
                        }
                    </Navbar>
                    <Main>
                        <Title>blog app</Title>
                        <Notification />
                        {blogForm()}
                    </Main>
                    <Switch>
                        <Route path='/users/:id'>
                            <User />
                        </Route>
                        <Route path='/users'>
                            <Users />
                        </Route>
                        <Route path='/blogs/:id'>
                            <BlogFull
                                loggedUser={loggedUser}
                                updateBlog={updateTheBlog}
                                removeBlog={removeTheBlog}
                            />
                        </Route>
                        <Route path='/blogs'>
                            <h2>blogs</h2>
                            {sortedBlogs().map(blog =>
                                <Blog key={blog.id} blog={blog} />
                            )}
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Page>
    )
}

export default App
