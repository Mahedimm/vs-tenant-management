const {PermissionModel} = require("../models/landlordPermission.model");

setTimeout(async () => {
    const arr = [
        { name: 'dashboard_index', displayName: 'Dashboard View', group: 'Dashboard' },

        { name: 'landlord_flats_index', displayName: 'Flats View', group: 'User Management - Flats' },
        { name: 'flats_create', displayName: 'Flats Create', group: 'Landlord User Management - Flats' },
        { name: 'flats_update', displayName: 'Flats Update', group: 'Landlord User Management - Flats' },
        { name: 'flats_delete', displayName: 'Flats Delete', group: 'Landlord User Management - Flats' },

        { name: 'roles_index', displayName: 'Roles View', group: 'Landlord User Management - Roles' },
        { name: 'roles_create', displayName: 'Roles Create', group: 'Landlord User Management - Roles' },
        { name: 'roles_update', displayName: 'Roles Update', group: 'Landlord User Management - Roles' },
        { name: 'roles_delete', displayName: 'Roles Delete', group: 'Landlord User Management - Roles' },

        { name: 'roles_permissions_index', displayName: 'Roles Permissions View', group: 'Landlord User Management - Roles Permissions' },
        { name: 'roles_permissions_update', displayName: 'Roles Permissions Update', group: 'Landlord User Management - Roles Permissions' },

        { name: 'users_index', displayName: 'Users View', group: 'Landlord User Management - Users' },
        { name: 'users_create', displayName: 'Users Create', group: 'Landlord User Management - Users' },
        { name: 'users_update', displayName: 'Users Update', group: 'Landlord User Management - Users' },
        { name: 'users_delete', displayName: 'Users Delete', group: 'Landlord User Management - Users' },
    ];

    await PermissionModel.deleteMany({}, (error, docs) => {
        if (error)
            console.log(error)
    });

    await PermissionModel.insertMany(arr, (error, docs) => {
        if (error)
            console.log(error)
    });
}, 1100);
