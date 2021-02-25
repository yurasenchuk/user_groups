const groupsLoaded = (data) => {
    return {
        type: 'GROUPS_LOADED',
        payload: data
    }
};

const groupDeleted = (id) => {
    return {
        type: 'GROUP_DELETED',
        payload: id
    }
};

const groupUpdated = (data) => {
    return {
        type: 'GROUP_UPDATED',
        payload: data
    }
};

const groupCreated = (data) => {
    return {
        type: 'GROUP_CREATED',
        payload: data
    }
}

export {groupsLoaded, groupDeleted, groupUpdated, groupCreated};