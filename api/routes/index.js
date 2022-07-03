const express = require("express");
const ApiError = require("./../utils/ApiError");
const apiResponse = require("./../utils/apiResponse");
const httpStatus = require("http-status");

const router = express.Router();

const guestRoute = require("./guest.route");

// landlord 
const authRoute = require("./landlord/auth.route");
const utilitiesRoute = require("./landlord/utilities.route");
const lmRoute = require("./landlord/lm.route");


router.use("/", guestRoute);

router.use("/landlord/auth", authRoute);
router.use("/landlord/utilities", utilitiesRoute);
router.use("/landlord/landlord-management", lmRoute);
// router.use("/landlord/tenant-management", tmRoute);

// send back a 404 error for any unknown api request
router.use((req, res, next) => {
    const error = new ApiError(httpStatus.NOT_FOUND);
    return next(error);
});

// convert error to ApiError, if needed
router.use((error, req, res, next) => {
    const status = error.statusCode || res.statusCode || 500;
    const stack = process.env.NODE_ENVIRONMENT !== "production" ? error.stack : {};

    return apiResponse(res, status, error.message, stack);
});

module.exports = router;
