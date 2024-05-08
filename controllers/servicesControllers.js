const asyncHandler = require("express-async-handler");
const Services = require("./../model/services");
const ServicePageDetails = require("./../model/pageDetails");

const createServices = asyncHandler(async (req, res) => {
  const { title, body, image, details } = req.body;
  try {
    const newServices = new Services({
      title,
      image,
      body,
      details,
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
    const services = await Services.find({}).populate("pageDetails");
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
  const { title, body, image, details } = req.body;
  try {
    const item = await Services.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    item.title = title || item.title;
    item.body = body || item.body;
    item.image = image || item.image;
    item.details = details || item.details;

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
  try {
    const { title, body, page_id, image } = req.body;
    const page_details = new ServicePageDetails({
      title,
      body,
      page_id,
      image,
    });

    await page_details.save();

    await Services.findByIdAndUpdate(page_id, {
      $push: { pageDetails: page_details._id },
    });

    // Send response
    res.status(201).json(page_details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deletePageInfoById = asyncHandler(async (req, res) => {
  try {
    const pageInfoId = req.params.id;
    const deletePageInfo = await ServicePageDetails.findByIdAndDelete(
      pageInfoId
    );

    if (!deletePageInfo) {
      return res.status(404).json({ error: "Page info not found" });
    }
    await Services.updateOne(
      { pageDetails: pageInfoId },
      { $pull: { pageDetails: pageInfoId } }
    );
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const updatePageInfo = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;
  try {
    const item = await ServicePageDetails.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Service Page details not found" });
      return;
    }
    item.title = title || item.title;
    item.body = body || item.body;
    item.image = image || item.image;

    const updatePageInfo = await ServicePageDetails.save();

    res.json({
      message: "Service updated successfully",
      data: updatePageInfo,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update services", error: error.message });
  }
});

module.exports = {
  createServices,
  getAllServices,
  servicesById,
  updateServices,
  deleteService,
  addPageInfo,
  deletePageInfoById,
  updatePageInfo,
};
