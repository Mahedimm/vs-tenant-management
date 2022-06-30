const httpStatus = require("http-status");

const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");

const {RoleModel, RoleStatus} = require("../../models/beRole.model");
const {UserModel, UserStatus} = require("../../models/feUser.model");

const getRoles = catchAsync(async (req, res) => {
    const roles = await RoleModel.find({ status: { $eq: RoleStatus.active } });
    return apiResponse(res, httpStatus.OK, {data: roles});
});

const getUser = catchAsync(async (req, res) => {
    const {email, phone} = req.query;
    const conditions = {status: UserStatus.active};

    email ? Object.assign(conditions, {email}) : null;
    phone ? Object.assign(conditions, {phone}) : null;

    const users = await UserModel.findOne(conditions, {firstName: true, lastName: true, photo: true, email: true, phone: true});
    return apiResponse(res, httpStatus.OK, {data: users});
});

module.exports = {
    getRoles, getUser,
};