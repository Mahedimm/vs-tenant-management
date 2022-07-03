const {PermissionModel} = require("../models/landlordPermission.model");

setTimeout(async () => {
    const arr = [
        { name: 'dashboard_index', displayName: 'Dashboard View', group: 'Dashboard' },

        { name: 'landlord_m_flats_index', displayName: 'Flats View', group: 'User Management - Flats' },
        { name: 'landlord_m_flats_create', displayName: 'Flats Create', group: 'Landlord User Management - Flats' },
        { name: 'landlord_m_flats_update', displayName: 'Flats Update', group: 'Landlord User Management - Flats' },
        { name: 'landlord_m_flats_delete', displayName: 'Flats Delete', group: 'Landlord User Management - Flats' },

        { name: 'landlord_m_roles_index', displayName: 'Roles View', group: 'Landlord User Management - Roles' },
        { name: 'landlord_m_roles_create', displayName: 'Roles Create', group: 'Landlord User Management - Roles' },
        { name: 'landlord_m_roles_update', displayName: 'Roles Update', group: 'Landlord User Management - Roles' },
        { name: 'landlord_m_roles_delete', displayName: 'Roles Delete', group: 'Landlord User Management - Roles' },

        { name: 'landlord_m_roles_permissions_index', displayName: 'Roles Permissions View', group: 'Landlord User Management - Roles Permissions' },
        { name: 'landlord_m_roles_permissions_update', displayName: 'Roles Permissions Update', group: 'Landlord User Management - Roles Permissions' },

        { name: 'landlord_m_users_index', displayName: 'Users View', group: 'Landlord User Management - Users' },
        { name: 'landlord_m_users_create', displayName: 'Users Create', group: 'Landlord User Management - Users' },
        { name: 'landlord_m_users_update', displayName: 'Users Update', group: 'Landlord User Management - Users' },
        { name: 'landlord_m_users_delete', displayName: 'Users Delete', group: 'Landlord User Management - Users' },


        { name: 'landlord_m_tenants_index', displayName: 'Tenants View', group: 'Landlord User Management - Tenant' },
        { name: 'landlord_m_tenants_create', displayName: 'Users Create', group: 'Landlord User Management - Tenant' },
        { name: 'landlord_m_tenants_update', displayName: 'Tenants Update', group: 'Landlord User Management - Tenant' },
        { name: 'landlord_m_tenants_delete', displayName: 'tenants Delete', group: 'Landlord User Management - Tenant' },
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
