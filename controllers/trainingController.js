const asyncHandler = require("express-async-handler");
const Training = require("./../model/training");

const createTraining = asyncHandler(async (req, res) => {
  const { title, details, image } = req.body;
  try {
    const newTraining = new Training({
      title,
      image,
      details,
    });
    const data = await newTraining.save();
    res.status(201).json({
      message: "Training created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create Training",
      error: error.message,
    });
  }
});

const getAllTraining = asyncHandler(async (req, res) => {
  try {
    const training = await Training.find({});
    res.json({
      message: "Successfully retrieved all Training",
      data: training,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
});

const trainingById = asyncHandler(async (req, res) => {
  try {
    const item = await Training.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Training not found" });
    } else {
      res.json(item);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding services", error: error.message });
  }
});

const updateTraining = asyncHandler(async (req, res) => {
  const { title, details, image } = req.body;
  try {
    const item = await Training.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    item.title = title || item.title;
    item.details = details || item.details;
    item.image = image || item.image;

    const updateTraining = await Services.save();

    res.json({
      message: "Service updated successfully",
      data: updateTraining,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update services", error: error.message });
  }
});
const deleteTraining = asyncHandler(async (req, res) => {
  try {
    const item = await Training.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Training not found" });
      return;
    }
    res.json({ message: "Training deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Training", error: error.message });
  }
});
const addPageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, details } = req.body;

  try {
    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ error: "Training not found" });
    }

    // Assuming 'pageDetails' is an array field in your schema
    training.pageDetails.push({ title, image, details });

    // Save the updated service
    await training.save();

    res.json({ message: "Page info added successfully", training });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add page info", error: error.message });
  }
});

const updatePageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, details } = req.body;
  const pageDetails = { title, image, details };
  try {
    const training = await Training.findById(id);

    if (!training) {
      return res.status(404).json({ error: "training not found" });
    }
    training.pageDetails = { ...training.pageDetails, ...pageDetails };

    // Save the updated service
    await training.save();
    res.json({ message: "Page details updated successfully", training });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update page details", message: error.message });
  }
});

const deletePageInfo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const training = await Services.findById(id);

    if (!training || !training.page_details) {
      return res.status(404).json({ error: "Page details not found" });
    }

    // Remove the page_details field
    training.page_details = undefined;

    // Save the updated service
    await training.save();

    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete page details", message: error.message });
  }
});

module.exports = {
  createTraining,
  trainingById,
  updateTraining,
  deleteTraining,
  getAllTraining,
  addPageInfo,
  updatePageInfo,
  deletePageInfo,
};
