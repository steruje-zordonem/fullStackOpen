let timeoutID;

export const createNotification = (notification, time) => {
    return async dispatch => {
        window.clearTimeout(timeoutID)
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        timeoutID = setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION' })
        }, time * 1000)
    }
}


const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default reducer