const express = require("express");
const router = express.Router();

const controllers = require("../controllers/event");

router.get("/", controllers.getEvents);

router.get("/:id", controllers.getEventById);

module.exports = router;
