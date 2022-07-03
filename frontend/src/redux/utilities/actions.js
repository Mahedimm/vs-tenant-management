const actions = {
    LOADING_START       : 'LOADING_START',
    LOADING_END         : 'LOADING_END',

    FETCH_UTILITIES_ROLES   : 'FETCH_UTILITIES_ROLES',
    FETCH_UTILITIES_USER    : 'FETCH_UTILITIES_USER',

    LoadingStart: () => {
        return {
            type: actions.LOADING_START,
        };
    },
    LoadingEnd: data => {
        return {
            type: actions.LOADING_END
        };
    },
    fetchRolesAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_ROLES,
            data: data
        };
    },
    fetchUserAction: (data) => {
        return {
            type: actions.FETCH_UTILITIES_USER,
            data: data
        };
    },
};

export default actions;
