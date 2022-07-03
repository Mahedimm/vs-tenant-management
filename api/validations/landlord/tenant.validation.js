const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");




const addTenant = {
    body: Joi.object({
      
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
        status: Joi.string().required(),
    })
};


const getTenant = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const updateTenant = {
    body: Joi.object({
        _id: Joi.string().required(),
        
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
        status: Joi.string().required(),
    })
};

const deleteTenant = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const getTenants = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};



module.exports = {


    getTenantsValidation: validate(getTenants),
    addTenantValidation: validate(addTenant),
    getTenantValidation: validate(getTenant),
    updateTenantValidation: validate(updateTenant),
    deleteTenantValidation: validate(deleteTenant),

 

}