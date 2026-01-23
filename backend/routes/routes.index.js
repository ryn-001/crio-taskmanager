const express = require('express');
const router = express.Router();
const UserRouter = require("./users.routes");
const TaskRouter = require("./tasks.routes");

router.use('/users',UserRouter);
router.use('/tasks',TaskRouter);

module.exports = router;