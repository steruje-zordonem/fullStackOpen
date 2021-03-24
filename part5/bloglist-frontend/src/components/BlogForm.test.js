import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler when a new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    // Fill the form with data for a new blog
    const title = component.container.querySelector('input[name="Title"')
    fireEvent.change(title, {
        target: { value: 'About war' }
    })

    const author = component.container.querySelector('input[name="Author"]')
    fireEvent.change(author, {
        target: { value: 'Bruce Lee' }
    })

    const url = component.container.querySelector('input[name="Url"]')
    fireEvent.change(url, {
        target: { value: 'www.cnn.com' }
    })

    // then submit a form
    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('About war')
    expect(createBlog.mock.calls[0][0].author).toBe('Bruce Lee')
    expect(createBlog.mock.calls[0][0].url).toBe('www.cnn.com')
})