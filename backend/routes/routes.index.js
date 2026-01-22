const express = require('express');
const router = express.Router();
const UserRouter = require("./users.routes");

router.use('/users',UserRouter);


module.exports = router;