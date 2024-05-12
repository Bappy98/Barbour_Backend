const HealthySpotlight = require("./healthySpotlightRoute");
const Service = require("./servicesRoute");
const User = require("./userRoute");
const Training = require("./trainingRoute");
const Audit = require("./auditRoute");

module.exports = [HealthySpotlight, Service, User, Training, Audit];
