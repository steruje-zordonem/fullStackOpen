import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin: 0 auto;
    text-align: center;
`

const Form = styled.form`
    width: 30%;
    border: 7px solid palevioletred;
    border-radius: 18px;
    text-align: center;
    padding: 10px;
    margin: 10px auto;
    font-size: 1.1em;
`

const Input = styled.input`
    margin: 3px auto;
`

const Button = styled.button`
    background: Bisque;
    font-size: 0.9em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
`


const LoginForm = ({ handleLoginForm }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        handleLoginForm({ username, password })
        // After all clean the inputs and handle possible errors
        setUsername('')
        setPassword('')
    }

    return (
        <Wrapper>
            <h2>Login</h2>

            <Form onSubmit={handleSubmit}>
                <div>
                    username
                    <Input
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <Input
                        id='password'
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <Button id='login-button' type="submit">login</Button>
            </Form>
        </Wrapper>
    )
}

LoginForm.propTypes = {
    handleLoginForm: PropTypes.func.isRequired
}

export default LoginForm