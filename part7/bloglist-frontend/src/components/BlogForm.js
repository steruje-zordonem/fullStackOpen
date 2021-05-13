import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-top: 50px;
`

const Button = styled.button`
    background: Bisque;
    font-size: 0.9em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
`

const FormGroup = styled.div`
    border: 6px solid LightGreen;
    border-radius: 20px;
	color: palevioletred;
    display: block;
	width: 350px;
	margin: 20px auto;
    padding: 10px;
`

const Input = styled.input`
	padding: 0.5em;
	color: palevioletred;
	background: white;
	border: 0.5px solid black;
	width: 100%;
    box-sizing: border-box;
	margin: 0.5em 0;
`


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
        <Wrapper>
            <h2>create new</h2>

            <FormGroup onSubmit={handleSubmit}>
                <div>
                    title
                    <Input
                        id="title"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <Input
                        id="author"
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <Input
                        id="url"
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <Button id="create-blog-button" type="submit">create</Button>
            </FormGroup>
        </Wrapper>

    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm