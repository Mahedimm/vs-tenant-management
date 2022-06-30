const express = require("express");
const router = express.Router();
const {isAuthenticated, isScopePermitted} = require("./../../middlewares/auth.middleware");
const {
    addRole, getRoles, deleteRole, getRole, updateRole,
    getUsers, addUser, updateUser, getUser, deleteUser,
    getRolesPermissions, updateRolesPermissions,
    getFlats, getFlat, addFlat, updateFlat, deleteFlat,
    getTenants, getTenant, addTenant, updateTenant, deleteTenant,
} = require("./../../controllers/landlord/landlord.controller");
const {
    getRolesValidation, getRoleValidation, addRoleValidation, updateRoleValidation, deleteRoleValidation,
    getRolesPermissionsValidation, updateRolesPermissionsValidation,
    getUsersValidation, addUserValidation, getUserValidation, updateUserValidation, deleteUserValidation,   
} = require("../../validations/landlord/landlordUm.validation")

const { getFlatsValidation,
    addFlatValidation, getFlatValidation, updateFlatValidation, deleteFlatValidation } = require("../../validations/landlord/flat.validation")

const {getTenantsValidation, getTenantValidation, addTenantValidation, updateTenantValidation, deleteTenantValidation} = require("../../validations/landlord/tenant.validation")

router.get("/roles", isAuthenticated, isScopePermitted('landlord_m_roles_index'), getRolesValidation, getRoles);
router.get("/roles/:_id", isAuthenticated, isScopePermitted('landlord_m_roles_index'), getRoleValidation, getRole);
router.post("/roles", isAuthenticated, isScopePermitted('landlord_m_roles_create'), addRoleValidation, addRole);
router.put("/roles/:_id", isAuthenticated, isScopePermitted('landlord_m_roles_update'), updateRoleValidation, updateRole);
router.delete("/roles/:_id", isAuthenticated, isScopePermitted('landlord_m_roles_delete'), deleteRoleValidation, deleteRole);

router.get("/roles-permissions/:_id", isAuthenticated, isScopePermitted('landlord_m_roles_permissions_index'),getRolesPermissionsValidation, getRolesPermissions);
router.put("/roles-permissions", isAuthenticated, isScopePermitted('landlord_m_roles_permissions_index'), updateRolesPermissionsValidation, updateRolesPermissions);

//users
router.get("/users", isAuthenticated, isScopePermitted('landlord_m_users_index'), getUsersValidation, getUsers);
router.post("/users", isAuthenticated, isScopePermitted('landlord_m_users_create'), addUserValidation, addUser)
router.get("/users/:_id", isAuthenticated, isScopePermitted('landlord_m_users_index'), getUserValidation, getUser)
router.put("/users/:_id", isAuthenticated, isScopePermitted('landlord_m_users_update'),updateUserValidation, updateUser)
router.delete("/users/:_id", isAuthenticated, isScopePermitted('landlord_m_users_delete'), deleteUserValidation, deleteUser)

//flat
router.get("/flats", isAuthenticated, isScopePermitted('landlord_m_flats_index'), getFlatsValidation, getFlats);
router.post("/flats", isAuthenticated, isScopePermitted('landlord_m_flats_create'), addFlatValidation, addFlat)
router.get("/flats/:_id", isAuthenticated, isScopePermitted('landlord_m_flats_index'), getFlatValidation, getFlat)
router.put("/flats/:_id", isAuthenticated, isScopePermitted('landlord_m_flats_update'), updateFlatValidation, updateFlat)
router.delete("/flats/:_id", isAuthenticated, isScopePermitted('landlord_m_flats_delete'), deleteFlatValidation, deleteFlat)

//tenant
router.get("/tenants", isAuthenticated, isScopePermitted('landlord_m_tenants_index'), getTenantsValidation, getTenants)
router.post("/tenants", isAuthenticated, isScopePermitted('landlord_m_tenants_create'), addTenantValidation, addTenant)
router.get("/tenants/:_id", isAuthenticated, isScopePermitted('landlord_m_tenants_index'), getTenantValidation, getTenant)
router.put("/tenants/:_id", isAuthenticated, isScopePermitted('landlord_m_tenants_update'), updateTenantValidation, updateTenant)
router.delete("/tenants/:_id", isAuthenticated, isScopePermitted('landlord_m_tenants_delete'), deleteTenantValidation, deleteTenant)

module.exports = router