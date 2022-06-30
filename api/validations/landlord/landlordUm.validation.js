const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");

const getRoles = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};
const getRole = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const addRole = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const updateRole = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteRole = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const getRolesPermissions = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const updateRolesPermissions = {
    body: Joi.object({
        roleId: Joi.string().required(),
        permissions: Joi.array().items(Joi.string().required())
    })
};

const addUser = {
    body: Joi.object({
        roleId: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.number().required(),
        gender: Joi.string().required(),
        fathersName: Joi.string().allow(''),
        fathersPhone: Joi.number().allow(''),
        mothersName: Joi.string().allow(''),
        mothersPhone: Joi.string().allow(''),
        presentAddress: Joi.string().allow(''),
        permanentAddress: Joi.string().allow(''),
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        superAdmin: Joi.boolean().required(),
        status: Joi.string().required(),
    })
};

const getUser = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const updateUser = {
    body: Joi.object({
        _id: Joi.string().required(),
        roleId: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.number().required(),
        gender: Joi.string().required(),
        fathersName: Joi.string().allow(""),
        fathersPhone: Joi.number().allow(""),
        mothersName: Joi.string().allow(""),
        mothersPhone: Joi.string().allow(""),
        presentAddress: Joi.string().allow(""),
        permanentAddress: Joi.string().allow(""),
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        superAdmin: Joi.boolean().required(),
        status: Joi.string().required(),
    })
};

const deleteUser = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const getUsers = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};



module.exports = {
    getRolesValidation: validate(getRoles),
    getRoleValidation: validate(getRole),
    addRoleValidation: validate(addRole),
    updateRoleValidation: validate(updateRole),
    deleteRoleValidation: validate(deleteRole),

    getRolesPermissionsValidation: validate(getRolesPermissions),
    updateRolesPermissionsValidation: validate(updateRolesPermissions),

    getUsersValidation: validate(getUsers),
    addUserValidation: validate(addUser),
    getUserValidation: validate(getUser),
    updateUserValidation: validate(updateUser),
    deleteUserValidation: validate(deleteUser),

    
}