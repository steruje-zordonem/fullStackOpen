import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

/*
Make a test which checks that the component displaying a blog renders the blog's title
and author, but does not render its url or number of likes by default
*/

describe('<Blog /> tests', () => {
    let component

    const blog = {
        title: 'Hello world',
        author: 'Joe Blow',
        url: 'www.jakatomelodia.org',
        likes: 10,
        user: {
            id: '1',
            name: 'root'
        }
    }

    const loggedUser = {
        name: 'root',
        username: 'root',
        id: '11'
    }


    test('renders content', () => {

        component = render(
            <Blog blog={blog}/>
        )

        const button = component.getByText('view')
        expect(button).toBeDefined()

        expect(component.container).toHaveTextContent('Hello world')
        expect(component.container).toHaveTextContent('Joe Blow')
        expect(component.container).not.toHaveTextContent(
            'www.jakatomelodia.org'
        )
        expect(component.container).not.toHaveTextContent(
            'likes'
        )
    })

    test('after clicking button component shows blog\'s url and number of likes', () => {
        component = render(
            <Blog blog={blog} loggedUser={loggedUser}/>
        )

        // define button element, and simulate click on it
        const button = component.getByText('view')
        fireEvent.click(button)

        //component.debug()

        // after a click the url and likes should be visible
        expect(component.container).toHaveTextContent('www.jakatomelodia.org')
        expect(component.container).toHaveTextContent('likes')
    })

    test('if like button is clicked twice, event handler is also called twice', () => {
        // define mock function for clicking a button
        const clickLikeBtn = jest.fn()

        // render Blog component
        component = render(
            <Blog blog={blog} loggedUser={loggedUser} updateBlog={clickLikeBtn}/>
        )

        // first click 'view' button to expand Blog data
        const viewBtn = component.getByText('view')
        fireEvent.click(viewBtn)

        // define 'like' button and simulate 2x click
        const likeBtn = component.getByText('like')
        fireEvent.click(likeBtn)
        fireEvent.click(likeBtn)

        // check if mock function was called twice
        expect(clickLikeBtn.mock.calls).toHaveLength(2)
    })
})

