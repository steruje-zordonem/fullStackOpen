export const initializeUsers = users => {
    return {
        type: 'INIT_USERS',
        data: users,
    }
}

const usersReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
    }
}

export default usersReducer