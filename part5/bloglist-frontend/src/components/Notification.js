import React from 'react'

const Notification = ({ message }) => {
    // If message = null displays nothing
    if (message === null) {
        return null
    }

    // If message is positive display it in green
    if(message.toLowerCase().includes('added')) {
        return(
            <div className="positive">
                {message}
            </div>
        )
    }

    // If message is negative display it in red
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification