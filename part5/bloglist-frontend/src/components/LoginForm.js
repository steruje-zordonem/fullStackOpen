import React, { useState } from 'react'
import PropTypes from 'prop-types'


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
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id='login-button' type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLoginForm: PropTypes.func.isRequired
}

export default LoginForm