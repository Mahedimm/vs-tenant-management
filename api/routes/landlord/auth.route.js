const express = require("express");
const router = express.Router();

const {isClientAuthenticated, isAuthenticated} = require("../../middlewares/auth.middleware");
const {login, renew, register, logout} = require("../../controllers/landlord/auth.controller");
const {loginValidation, renewValidation, registerValidation} = require("../../validations/landlord/auth.validation");


router.post("/login", isClientAuthenticated, loginValidation, login);


router.post("/renew", isClientAuthenticated, renewValidation, renew);


router.post("/register", isClientAuthenticated, registerValidation, register);

router.delete("/logout", isAuthenticated, logout);

module.exports = router;