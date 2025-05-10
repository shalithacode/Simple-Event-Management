const Event = require("../models/event");

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
