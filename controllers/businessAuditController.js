const asyncHandler = require("express-async-handler");
const Audit = require("../model/businessAudit");
const createAudit = asyncHandler(async (req, res) => {
  try {
    const { title, body, image, details } = req.body;
    const newAudit = new Audit({
      title,
      body,
      image,
      details,
    });
    const data = await newAudit.save();
    res.status(201).json({
      message: "Audit created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create audit",
      error: error.message,
    });
  }
});

const getAudit = asyncHandler(async (req, res) => {
  try {
    const audit = await Audit.find({});
    res.json({
      message: "Successfully retrieved audit",
      data: audit,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving audit", error: error.message });
  }
});

const updateAudit = asyncHandler(async (req, res) => {
  const { title, body, image, details } = req.body;
  try {
    // Retrieve the audit item and await the query
    let item = await Audit.findById(req.params.id);

    if (!item) {
      res.status(404).json({
        message: "Audit not found",
      });
      return;
    }

    // Update the fields if provided in the request body
    item.title = title || item.title;
    item.image = image || item.image;
    item.details = details || item.details;
    item.body = body || item.body;

    // Save the updated audit item
    const updatedAudit = await item.save();

    res.json({
      message: "Audit updated successfully",
      data: updatedAudit,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update audit", error: error.message });
  }
});

const deleteAudit = asyncHandler(async (req, res) => {
  try {
    const item = await Audit.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Audit not found" });
      return;
    }
    res.json({ message: "Audit deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Audit", error: error.message });
  }
});

module.exports = {
  createAudit,
  updateAudit,
  deleteAudit,
  getAudit,
};
