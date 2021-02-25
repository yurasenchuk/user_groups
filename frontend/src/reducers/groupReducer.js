const initialState = {
    groups: []
}

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GROUPS_LOADED':
            return {
                ...state,
                groups: action.payload
            };
        case 'GROUP_UPDATED':
            const index = state.groups.findIndex(group => group.id === action.payload.id);
            const updatedGroup = {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description
            };
            return {
                ...state,
                groups: [
                    ...state.groups.slice(0, index),
                    updatedGroup,
                    ...state.groups.slice(index + 1)
                ]
            };
        case 'GROUP_DELETED':
            const groupIndex = state.groups.findIndex(group => group.id === action.payload);
            return {
                ...state,
                groups: [
                    ...state.groups.slice(0, groupIndex),
                    ...state.groups.slice(groupIndex + 1)
                ]
            };
        case 'GROUP_CREATED':
            return {
                ...state,
                groups: [
                    ...state.groups,
                    action.payload
                ]
            };
        default:
            return state;
    }
}

export default groupReducer;