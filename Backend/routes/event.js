const express = require("express");
const router = express.Router();

const eventValidator = require("../middleware/event-validator");
const controllers = require("../controllers/event");

router.get("/", controllers.getEvents);

router.get("/:id", controllers.getEventById);

router.post("/", eventValidator.postValidationChecks, controllers.createEvent);

router.patch("/:id", eventValidator.patchValidationChecks, controllers.editEvent);

router.delete("/:id", controllers.deleteEvent);

module.exports = router;
