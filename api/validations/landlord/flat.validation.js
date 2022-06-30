const Joi = require('@hapi/joi');
const {validate} = require("../../utils/validate");

const getFlats = {
    query: Joi.object({
        page: Joi.string().optional(),
        perPage: Joi.string().optional(),
    })
};

const addFlat = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
  })
};

const getFlat = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};

const updateFlat = {
    body: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
    })
};

const deleteFlat = {
    params: Joi.object({
        _id: Joi.string().required(),
    })
};


module.exports = {
    getFlatsValidation: validate(getFlats),
    addFlatValidation: validate(addFlat),
    getFlatValidation: validate(getFlat),
    updateFlatValidation: validate(updateFlat),
    deleteFlatValidation: validate(deleteFlat),
}