const express = require("express");

const router = express.Router();

const {register} = require("../controller/register");

const {login} = require("../controller/login");

router.post("/register", register);  // Post request to register the users

router.post("/login", login); //Post to login users

module.exports = router;

