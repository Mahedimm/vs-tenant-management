const httpStatus = require("http-status");
const mongoose = require("mongoose");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");

const {RoleModel, RoleStatus} = require("../../models/landlordRole.model");
const {FlatModel, FlatStatus} = require("../../models/flat.model");
const {TenantModel, TenantStatus} = require("../../models/tenant.model");
const {PermissionModel} = require("../../models/landlordPermission.model");
const {UserModel, UserStatus} = require("../../models/landlordUser.model");
const {TeamModel, TeamStatus} = require("../../models/landlordTeam.model");

const addRole = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    const newRole = new RoleModel({name, status, description, permissions: []});

    const err = newRole.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Validation Required"}, validation);
    }

    const save = await newRole.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Role Created"});
});

const updateRole = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    await RoleModel.updateOne({_id: req.params._id}, {$set: {name, status, description}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

const getRoles = catchAsync(async (req, res) => {
    const roles = await RoleModel
        .find({status: {$ne: RoleStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await RoleModel.countDocuments({status: {$ne: RoleStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: roles};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getRole = catchAsync(async (req, res) => {
    const {_id} = req.params;
    const roleInfo = await RoleModel.findOne({_id});
    return apiResponse(res, httpStatus.OK, {data: roleInfo})
});

const deleteRole = catchAsync(async (req, res) => {
    const findRoleUser = await UserModel.findOne({"role._id": req.params._id}, {firstName: true, lastName: true});
    if (findRoleUser)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: `${findRoleUser.firstName} ${findRoleUser.lastName} is assigned to this role, it can't be deleted.`});

    await RoleModel.updateOne({_id: req.params._id}, {$set: {status: RoleStatus.deleted}});
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"});
});


//// User Functions ////
const getUsers = catchAsync(async (req, res) => {
    const users = await UserModel
        .find({status: {$ne: UserStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await UserModel.countDocuments({status: {$ne: UserStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: users};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const addUser = catchAsync(async (req, res) => {
    const {roleId} = req.body;
    const roleInfo = await RoleModel.findOne({_id: roleId}, {name: true})
    const role = {_id, name} = roleInfo;

    const personal = {firstName, lastName, phone, gender, fathersName, fathersPhone, mothersName, mothersPhone, presentAddress, permanentAddress} = req.body ;
    const {email, username, superAdmin, status, } = req.body;
    const newUser = new UserModel({role, personal, email, username, superAdmin, status, password: 123456});

    const err = newUser.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Validation Required"}, validation)
    }

    const save = await newUser.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "User Created"})
})

const getUser = catchAsync(async (req, res) => {
    const {_id} = req.params;
    const userinfo = await UserModel.findOne({_id})
    return apiResponse(res, httpStatus.OK, {data: userinfo})
})

const updateUser = catchAsync(async (req, res) => {
    console.log("User:",req.body)
    const {roleId} = req.body;
    const roleInfo = await RoleModel.findOne({_id: roleId})
    const role = {_id, name} = roleInfo;

    const personal = {firstName, lastName, phone, gender, fathersName, fathersPhone, mothersName, mothersPhone, presentAddress, permanentAddress} = req.body;
    const {email, username, superAdmin, status} = req.body;
    await UserModel.updateOne({_id: req.params._id}, {$set: {role, personal, email, username, superAdmin, status}})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"})
})

const deleteUser = catchAsync(async (req, res) => {
    await UserModel.updateOne({_id: req.params._id}, {status: UserStatus.deleted})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"})
})

// roles permissions
const getRolesPermissions = catchAsync(async (req, res) => {
    const checked = await RoleModel.findOne({_id: req.params._id});
    const rolesPermissions = await PermissionModel.find();

    const groupNames = [];
    await rolesPermissions.forEach((data) => groupNames.indexOf(data.group) === -1 ? groupNames.push(data.group) : '');

    const groups = [];
    await groupNames.forEach((data) => groups.push({group: data, permissions: [], checked: []}));

    await groups.forEach((group) => {
        rolesPermissions.forEach((permission) => {
            if (group.group === permission.group) {
                group.permissions.push({label: permission.displayName, value: permission.name})
                if (checked.permissions.indexOf(permission.name) !== -1) {
                    group.checked.push(permission.name)
                }
            }
        })
    });

    return apiResponse(res, httpStatus.OK, {data: groups});
});

const updateRolesPermissions = catchAsync(async (req, res) => {
    const {roleId, permissions} = req.body;
    await RoleModel.updateOne({_id: roleId}, { $set: { permissions } });
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"});
});

// Flat
const addFlat = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    const newFlat = new FlatModel({name, status, description});

    const err = newFlat.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Validation Required"}, validation)
    }

    const save = await newFlat.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Flat Created"})
})

const updateFlat = catchAsync(async (req, res) => {
    const {name, description, status} = req.body;
    await FlatModel.updateOne({_id: req.params._id}, {$set: {name, status, description}})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"})
})

const getFlats = catchAsync(async (req, res) => {
    const flats = await FlatModel
        .find({status: {$ne: FlatStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});
    const total = await FlatModel.countDocuments({status: {$ne: FlatStatus.deleted}})
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: flats}
    return apiResponse(res, httpStatus.OK, {data: response})
})

const getFlat = catchAsync(async (req, res) => {
    const {_id} = req.params;
    const flatInfo = await FlatModel.findOne({_id})
    return apiResponse(res, httpStatus.OK, {data: flatInfo})
})

const deleteFlat = catchAsync(async (req, res) => {
    const findFlatUser= await UserModel.findOne({"flat._id": req.params._id}, {
        firstName: true,
        lastName: true
    })
    if (findFlatUser)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: `${findFlatUser.firstName} ${findFlatUser.lastName} is assigned to this Flat, it can't be deleted.`})

    await FlatModel.updateOne({_id: req.params._id}, {status: FlatStatus.deleted})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"})
})


// Tenant
const addTenant = catchAsync(async (req, res) => {
    const personal = {firstName, lastName, phone, gender, fathersName, fathersPhone, mothersName, mothersPhone, presentAddress, permanentAddress} = req.body ;
    const flat ={flatName} = req.body;
    const emergency = {name, number, relation, address} = req.body ;
    const {email, username, status} = req.body;
   const newTenant = new TenantModel({personal, email, username, status,emergency, flat});

   const err = newTenant.validateSync();
   if (err instanceof mongoose.Error) {
       const validation = await validationError.requiredCheck(err.errors)
       return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Validation Required"}, validation)
   }

   const save = await newTenant.save();
   return apiResponse(res, httpStatus.CREATED, {data: save, message: "Tenant Created"})
})

const getTenants = catchAsync(async (req, res) => {
    const tenants = await TenantModel
        .find({status: {$ne: TenantStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await TenantModel.countDocuments({status: {$ne: TenantStatus.deleted}});
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: tenants};
    return apiResponse(res, httpStatus.OK, {data: response});
});

const getTenant = catchAsync(async (req, res) => {
    const {_id} = req.params;
    const tenantInfo = await TenantModel.findOne({_id})
    return apiResponse(res, httpStatus.OK, {data: tenantInfo})
})

const updateTenant = catchAsync(async (req, res) => {
    console.log("Tenant:",req.body)

    const personal = {firstName, lastName, phone, gender, fathersName, fathersPhone, mothersName, mothersPhone, presentAddress, permanentAddress} = req.body;
    const emergency = {name, number, relation, address} = req.body ;
    const {email, username,  status} = req.body;
    const flat = {flatName} = req.body;

    await TenantModel.updateOne({_id: req.params._id}, {$set: { personal, email, username, status,emergency, flat}})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"})
})

const deleteTenant = catchAsync(async (req, res) => {
    await TenantModel.updateOne({_id: req.params._id}, {status: TenantStatus.deleted})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"})
})

// Teams
const addTeam = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    const newTeam = new TeamModel({name, status, description});

    const err = newTeam.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Validation Required"}, validation)
    }

    const save = await newTeam.save();
    return apiResponse(res, httpStatus.CREATED, {data: save, message: "Team Created"})
})

const updateTeam = catchAsync(async (req, res) => {
    const {name, status, description} = req.body;
    await TeamModel.updateOne({_id: req.params._id}, {$set: {name, status, description}})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Updated"})
})

const getTeams = catchAsync(async (req, res) => {
    const teams = await TeamModel
        .find({status: {$ne: TeamStatus.deleted}})
        .skip(parseInt(req.query.perPage) * (parseInt(req.query.page) - 1))
        .limit(parseInt(req.query.perPage))
        .sort({createdAt: -1});

    const total = await TeamModel.countDocuments({status: {$ne: TeamStatus.deleted}})
    const response = {page: parseInt(req.query.page), perPage: parseInt(req.query.perPage), total, data: teams}
    return apiResponse(res, httpStatus.OK, {data: response})
})

const getTeam = catchAsync(async (req, res) => {
    const {_id} = req.params;
    const teamInfo = await TeamModel.findOne({_id})
    return apiResponse(res, httpStatus.OK, {data: teamInfo})
})

const deleteTeam = catchAsync(async (req, res) => {
    const findTeamUser = await UserModel.findOne({"team._id": req.params._id}, {firstName: true, lastName: true})
    if (findTeamUser)
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: `${findTeamUser.firstName} ${findTeamUser.lastName} is assigned to this team, it can't be deleted.`})

    await TeamModel.updateOne({_id: req.params._id}, {status: TeamStatus.deleted})
    return apiResponse(res, httpStatus.ACCEPTED, {message: "Deleted"})
})



module.exports = {
    addRole, getRoles, getRole, deleteRole, updateRole,
    getUsers, addUser, updateUser, getUser, deleteUser,
    getRolesPermissions, updateRolesPermissions,
    getFlat, addFlat, getFlats, updateFlat, deleteFlat,
    getTenant, addTenant, getTenants, updateTenant, deleteTenant,
    getTeam, addTeam, getTeams, updateTeam, deleteTeam
};