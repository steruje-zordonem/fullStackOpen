import React, { useEffect } from 'react'
import usersService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

import { Link } from 'react-router-dom'

const Row = ({ user }) => {
    const padding = {
        padding: 5
    }

    return (
        <tr>
            <td><Link style={padding} to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        usersService.getAll().then(fetchedUsers => {
            dispatch(initializeUsers(fetchedUsers))
        })
    }, [dispatch])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        ? users.map(user => <Row key={user.id} user={user} />)
                        : null
                    }
                </tbody>
            </table>
        </div>

    )
}

export default Users