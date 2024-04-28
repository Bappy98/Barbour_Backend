const asyncHandler = require("express-async-handler");
const Services = require("./../model/services");

const createServices = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;
  try {
    const newServices = new Services({
      title,
      image,
      body,
    });
    const data = await newServices.save();
    res.status(201).json({
      message: "Services created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create services",
      error: error.message,
    });
  }
});

const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Services.find({});
    res.json({
      message: "Successfully retrieved all services",
      data: services,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
});

const servicesById = asyncHandler(async (req, res) => {
  try {
    const item = await Services.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "services not found" });
    } else {
      res.json(item);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding services", error: error.message });
  }
});

const updateServices = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;
  try {
    const item = await Services.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    item.title = title || item.title;
    item.body = body || item.body;
    item.image = image || item.image;

    const updateService = await Services.save();

    res.json({
      message: "Service updated successfully",
      data: updateService,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update services", error: error.message });
  }
});
const deleteService = asyncHandler(async (req, res) => {
  try {
    const item = await Services.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Service", error: error.message });
  }
});
const addPageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, body, tags } = req.body;

  try {
    const service = await Services.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Assuming 'pageDetails' is an array field in your schema
    service.pageDetails.push({ title, image, body, tags });

    // Save the updated service
    await service.save();

    res.json({ message: "Page info added successfully", service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add page info", error: error.message });
  }
});

const updatePageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, body, tags } = req.body;
  const pageDetails = { title, image, body, tags };
  try {
    const service = await Services.findById(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    service.pageDetails = { ...service.pageDetails, ...pageDetails };

    // Save the updated service
    await service.save();
    res.json({ message: "Page details updated successfully", service });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update page details", message: error.message });
  }
});

const deletePageInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const service = await Services.findById(id);

    if (!service || !service.page_details) {
      return res.status(404).json({ error: "Page details not found" });
    }

    // Remove the page_details field
    service.page_details = undefined;

    // Save the updated service
    await service.save();

    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete page details", message: error.message });
  }
});

module.exports = {
  createServices,
  getAllServices,
  servicesById,
  updateServices,
  deleteService,
  addPageInfo,
  updatePageInfo,
  deletePageInfo,
};
