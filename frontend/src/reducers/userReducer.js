const initialState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_LOADED':
            return {
                ...state,
                users: action.payload
            };
        case 'USER_UPDATED':
            const index = state.users.findIndex(user => user.id === action.payload.id);
            const updatedUser = {
                id: action.payload.id,
                username: action.payload.username,
                group: action.payload.group,
                created: action.payload.created
            };
            return {
                ...state,
                users: [
                    ...state.users.slice(0, index),
                    updatedUser,
                    ...state.users.slice(index + 1)
                ]
            };
        case 'USER_DELETED':
            const userIndex = state.users.findIndex(user => user.id === action.payload);
            return {
                ...state,
                users: [
                    ...state.users.slice(0, userIndex),
                    ...state.users.slice(userIndex + 1)
                ]
            };
        case 'USER_CREATED':
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            };
        default:
            return state;
    }
}

export default userReducer;