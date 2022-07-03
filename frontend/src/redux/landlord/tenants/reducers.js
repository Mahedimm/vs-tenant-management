import actions from "./actions";

const {FETCH_TENANT, FETCH_TENANTS, RESET_TENANT} = actions;
const initState = {
    tenants: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    tenant: {_id: null}
};

const TenantReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_TENANTS:
            return {
                ...state,
                tenants: data
            }
        case RESET_TENANT:
            return {
                ...state,
                tenant: initState.tenant,
            };
        case FETCH_TENANT:
            return {
                ...state,
                tenant: data,
            };
        default:
            return state;
    }
}

export default TenantReducer;