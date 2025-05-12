const Event = require("../models/event");
const { validationResult } = require("express-validator");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (error) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      const error = new Error("Could not find event.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ event: event });
  } catch (error) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
exports.createEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }
  const eventData = req.body.event;

  const event = {
    title: eventData.title,
    description: eventData.description,
    date: eventData.date,
    image: eventData.image,
  };

  const newEvent = new Event(event);

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event saved.", event: savedEvent });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
