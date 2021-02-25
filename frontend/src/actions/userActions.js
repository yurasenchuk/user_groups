const usersLoaded = (data) => {
    return {
        type: 'USERS_LOADED',
        payload: data
    }
};

const userDeleted = (id) => {
    return {
        type: 'USER_DELETED',
        payload: id
    }
};

const userUpdated = (data) => {
    return {
        type: 'USER_UPDATED',
        payload: data
    }
};

const userCreated = (data) => {
    return {
        type: 'USER_CREATED',
        payload: data
    }
}

export {usersLoaded, userDeleted, userUpdated, userCreated};