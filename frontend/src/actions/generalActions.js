const loadingStarted = () => {
    return {
        type: 'LOADING_STARTED'
    }
};

const loadingEnded = () => {
    return {
        type: 'LOADING_ENDED'
    }
};

const errorOccurred = (data) => {
    return {
        type: 'ERROR_OCCURRED',
        payload: data
    }
};

const errorResolved = () => {
    return {
        type: 'ERROR_RESOLVED'
    }
};

const modalClick = (message) => {
    return {
        type: 'MODAL_CLICK',
        payload: message
    }
};

const modalBackClick = () => {
    return {
        type: 'MODAL_BACK_CLICK'
    }
};

export {
    loadingEnded,
    loadingStarted,
    errorOccurred,
    errorResolved,
    modalBackClick,
    modalClick
};
