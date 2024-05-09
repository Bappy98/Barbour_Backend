const Blog = require("./blogRoute");
const Service = require("./servicesRoute");
const User = require("./userRoute");
const Training = require("./trainingRoute");
const Audit = require("./auditRoute");

module.exports = [Blog, Service, User, Training, Audit];
