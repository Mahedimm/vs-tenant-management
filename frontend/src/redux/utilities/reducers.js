import actions from './actions';

const {
    LOADING_START, LOADING_END,
    FETCH_UTILITIES_ROLES, FETCH_UTILITIES_USER,
} = actions;

const initState = {
    loading: false,
    user: {_id: null},
    roles: [],
};

const UtilitiesReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case LOADING_START:
            return {
                ...state,
                loading: true,
            };
        case LOADING_END:
            return {
                ...state,
                loading: false,
            };
        case FETCH_UTILITIES_ROLES:
            return {
                ...state,
                roles: data,
            };
        case FETCH_UTILITIES_USER:
            return {
                ...state,
                user: data,
            };
        default:
            return state;
    }
};
export default UtilitiesReducer;
