import { combineReducers } from 'redux';

import authReducer from './authentication/reducers';
import utilitiesReducer from './utilities/reducers';
import tenantReducer from './landlord/tenants/reducers';
import userReducer from './landlord/users/reducers';

import roleReducer from './landlord/roles/reducers';
import flatReducer from './landlord/flats/reducers';

// import tenantReducer from './landlord/tenants/reducers';
// import teamReducer from './userManagement/teams/reducers';

// import categoryReducer from './webSetup/categories/reducers';

const rootReducers = combineReducers({
    auth: authReducer,
    utilities: utilitiesReducer,

    lmTenants: tenantReducer,
    lmRoles: roleReducer,
    lmFlats: flatReducer,
    lmUsers: userReducer,
    // umDepartments: departmentReducer,
    // umTeams: teamReducer,
    // wsCategories: categoryReducer,

   
});

export default rootReducers;