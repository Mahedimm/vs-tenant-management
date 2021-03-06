const express = require("express");
const router = express.Router();

const {isClientAuthenticated, isAuthenticated} = require("./../../middlewares/auth.middleware");
const {loginValidation, changePasswordValidation} = require("../../validations/landlord/auth.validation");

const {login, logout, changePassword} = require("../../controllers/landlord/auth.controller");

router.post("/login", isClientAuthenticated, loginValidation, login);
router.put("/change-password", isAuthenticated, changePassword)
router.delete("/logout", isAuthenticated, logout);

module.exports = router;