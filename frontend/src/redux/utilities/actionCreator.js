import actions from './actions';
import {RequestService as req} from '../../services/requestService';
import { Constants } from '../../config/constants';

const {
    LoadingStart, LoadingEnd,
    fetchRolesAction, fetchUserAction,
} = actions;

const loadingStart = () => async dispatch => dispatch(LoadingStart());
const loadingEnd = () => async dispatch => dispatch(LoadingEnd());

const fetchRoles = () => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}roles`,
            auth: 'bearer'
        }, (cb) => dispatch(fetchRolesAction(cb)))
    };
};

const fetchUser = (queries, action = null) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.UTILITIES}user`,
            queries,
            auth: 'bearer'
        }, (cb) => {
            dispatch(fetchUserAction(cb))
            if (action) action(cb)
        })
    };
};

export {
    loadingStart, loadingEnd,
    fetchRoles,
     fetchUser,
};
