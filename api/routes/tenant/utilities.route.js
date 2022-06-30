const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../../middlewares/auth.middleware");

const {
    getRoles, getUser,
} = require("../../controllers/tenant/utilities.controller");

router.get("/roles", isAuthenticated, getRoles);
router.get("/user", isAuthenticated, getUser);

module.exports = router;