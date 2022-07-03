import actions from './actions'
import {RequestService as req} from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchTenantAction, fetchTenantsAction, resetTenantFormAction } = actions;

export const addTenant = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.LANDLORD_MANAGEMENT}tenants`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchTenants({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const fetchTenants = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.LANDLORD_MANAGEMENT}tenants`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTenantsAction(cb)))
    };
};

export const updateTenant = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.LANDLORD_MANAGEMENT}tenants/${data._id}`,
            auth: 'bearer',
            body: data
        },  async (cb) => {
            await dispatch(fetchTenants({page: 1, perPage: 10}));
            if (action) await action();
        })
    };
};

export const resetTenantForm = () => dispatch => dispatch(resetTenantFormAction());
export const fetchTenant = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.LANDLORD_MANAGEMENT}tenants/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchTenantAction(cb));
            if (action) await action();
        })
    };
};

export const deleteTenant = (_id) => {
    return async dispatch => {
        await req.deleteRequest({
            url: `${Constants.LANDLORD_MANAGEMENT}tenants/${_id}`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchTenants({page: 1, perPage: 10})))
    };
};