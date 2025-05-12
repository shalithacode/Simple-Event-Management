const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const controllers = require("../controllers/event");

router.get("/", controllers.getEvents);

router.get("/:id", controllers.getEventById);

router.post(
  "/",
  [
    body("event").notEmpty().withMessage("Event data is required."),
    body("event.title").trim().notEmpty().withMessage("Title is required."),
    body("event.description").trim().notEmpty().withMessage("Description is required."),
    body("event.date").isDate().withMessage("Date is required."),
    body("event.image").trim().optional(),
  ],
  controllers.createEvent
);

module.exports = router;
