const initialState = {
    loading: false,
    error: {
        error: false,
        message: '',
        status: 200
    },
    modal: {
        modal: false,
        message: ''
    }
}

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'LOADING_ENDED':
            return {
                ...state,
                loading: false
            };
        case 'ERROR_OCCURRED':
            return {
                ...state,
                error: {
                    error: true,
                    message: action.payload.message,
                    status: action.payload.status
                }
            };
        case 'ERROR_RESOLVED':
            return {
                ...state,
                error: {
                    error: false,
                    message: '',
                    status: 200
                }
            };
        case 'MODAL_CLICK':
            return {
                ...state,
                modal: {
                    modal: true,
                    message: action.payload
                }
            };
        case 'MODAL_BACK_CLICK':
            return {
                ...state,
                modal: {
                    modal: false,
                    message: ''
                }
            };
        default:
            return state;
    }
}

export default generalReducer;