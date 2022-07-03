const actions = {
    FETCH_TENANTS : 'FETCH_TENANTS',
    FETCH_TENANT  : 'FETCH_TENANT',
    RESET_TENANT  : 'RESET_TENANT',

    fetchTenantsAction: (data) => {
        return {
            type: actions.FETCH_TENANTS,
            data: data
        };
    },
    resetTenantFormAction: () => {
        return {
            type: actions.RESET_TENANT,
            data: null
        };
    },
    fetchTenantAction: (data) => {
        return {
            type: actions.FETCH_TENANT,
            data: data
        };
    },
}

export default actions;