const express = require("express");
const {
  createTraining,
  getAllTraining,
  updateTraining,
  deleteTraining,
  addPageInfo,
  updatePageInfo,
  deletePageInfo,
  trainingById,
} = require("../controllers/trainingController");
const { IsSupperAdmin, protect } = require("../middleware/auth");

const router = express.Router();

router.route("/training/create").post(protect, IsSupperAdmin, createTraining);
router.route("/training").get(getAllTraining);
router
  .route("/training/:id")
  .get(trainingById)
  .put(protect, IsSupperAdmin, updateTraining)
  .delete(protect, IsSupperAdmin, deleteTraining);
router
  .route("/training/:id/page_details")
  .post(protect, IsSupperAdmin, addPageInfo)
  .put(protect, IsSupperAdmin, updatePageInfo)
  .delete(protect, IsSupperAdmin, deletePageInfo);
module.exports = router;
