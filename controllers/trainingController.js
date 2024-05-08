const asyncHandler = require("express-async-handler");
const Training = require("./../model/training");
const TrainingDetails = require("./../model/trainingDetails");

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
    const training = await Training.find({}).populate("pageDetails");
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
  try {
    const { title, body, page_id, image } = req.body;
    const page_details = new TrainingDetails({
      title,
      body,
      page_id,
      image,
    });

    await page_details.save();

    await Training.findByIdAndUpdate(page_id, {
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
    const deletePageInfo = await TrainingDetails.findByIdAndDelete(pageInfoId);

    if (!deletePageInfo) {
      return res.status(404).json({ error: "Page info not found" });
    }
    await Training.updateOne(
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
    const item = await TrainingDetails.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Service Page details not found" });
      return;
    }
    item.title = title || item.title;
    item.body = body || item.body;
    item.image = image || item.image;

    const updatePageInfo = await TrainingDetails.save();

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
  createTraining,
  trainingById,
  updateTraining,
  deleteTraining,
  getAllTraining,
  addPageInfo,
  updatePageInfo,
  deletePageInfoById,
};
