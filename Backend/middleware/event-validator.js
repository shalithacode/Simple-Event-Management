const { body } = require("express-validator");

exports.postValidationChecks = [
  body("event").notEmpty().withMessage("Event data is required."),
  body("event.title").trim().notEmpty().withMessage("Title is required."),
  body("event.description").trim().notEmpty().withMessage("Description is required."),
  body("event.date").isDate().withMessage("Date is required."),
  body("event.image").trim().optional(),
];

exports.patchValidationChecks = [
  body("event").notEmpty().withMessage("Event data is required."),
  body("event.title").optional().trim().notEmpty().withMessage("Title cannot be empty."),
  body("event.description").optional().trim().notEmpty().withMessage("Description cannot be empty."),
  body("event.date").optional().isISO8601().withMessage("Date must be a valid ISO 8601 date."),
  body("event.image").optional().trim(),
];
