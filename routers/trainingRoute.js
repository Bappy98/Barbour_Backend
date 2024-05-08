const express = require("express");
const {
  createTraining,
  getAllTraining,
  updateTraining,
  deleteTraining,
  addPageInfo,
  updatePageInfo,
  deletePageInfoById,
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
  .route("/training/page_details")
  .post(protect, IsSupperAdmin, addPageInfo);
router
  .route("/training/page_details/:id")
  .put(protect, IsSupperAdmin, updatePageInfo)
  .delete(protect, IsSupperAdmin, deletePageInfoById);
module.exports = router;
