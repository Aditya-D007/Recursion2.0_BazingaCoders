const express = require("express");
const hospitalControllers = require("../controllers/hospitalControllers");
const router = new express.Router();

router.post('/register/hospital',hospitalControllers.registerhospital)

router.post('/login/hospital',hospitalControllers.loginhospital)

module.exports = router;
