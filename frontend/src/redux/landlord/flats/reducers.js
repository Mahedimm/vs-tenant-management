import actions from './actions';

const { FETCH_FLATS, FETCH_FLAT, RESET_FLAT } = actions;
const initState = {
    flats: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    flat: {_id: null}
};

const FlatReducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case FETCH_FLATS:
            return {
                ...state,
                flats: data,
            };
        case RESET_FLAT:
            return {
                ...state,
                flat: initState.flat,
            };
        case FETCH_FLAT:
            return {
                ...state,
                flat: data,
            };
        default:
            return state;
    }
};

export default FlatReducer;
