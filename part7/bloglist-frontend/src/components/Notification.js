import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Positive = styled.div`
    color: green;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
`

const Negative = styled.div`
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;

`

const Notification = () => {
    const message = useSelector(state => state.notification)

    // If message = null displays nothing
    if (message === null) {
        return null
    }

    // If message is positive display it in green
    if (message.toLowerCase().includes('added')) {
        return (
            <Positive>
                {message}
            </Positive>
        )
    }

    // If message is negative display it in red
    return (
        <Negative>
            {message}
        </Negative>
    )
}

export default Notification