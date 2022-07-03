const actions = {
    FETCH_FLATS : 'FETCH_FLATS',
    FETCH_FLAT  : 'FETCH_FLAT',
    RESET_FLAT  : 'RESET_FLAT',

    fetchFlatsAction: (data) => {
        return {
            type: actions.FETCH_FLATS,
            data: data
        };
    },
    resetFlatFormAction: () => {
        return {
            type: actions.RESET_FLAT,
            data: null
        };
    },
    fetchFlatAction: (data) => {
        return {
            type: actions.FETCH_FLAT,
            data: data
        };
    },
};

export default actions;
