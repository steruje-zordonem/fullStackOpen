const Notification = ({message}) => {

    if(message === null) {
        return null
    }

    // Define className based on type of message: positive(eg. adding new contact) or negative(eg. error)
    let type; 
    
    if(message.toLowerCase().includes('added')) {
        type = 'positive'
    }
    
    if(message.toLowerCase().includes('removed')) {
        type = 'negative'
    }

    // Render the component (css styles are added to particular classes in index.css file)
    return(
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification;