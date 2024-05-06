const express = require("express");
const {
  createServices,
  getAllServices,
  servicesById,
  updateServices,
  deleteService,
  addPageInfo,
  updatePageInfo,
  deletePageInfo,
} = require("../controllers/servicesControllers");
const { IsSupperAdmin, protect } = require("../middleware/auth");

const router = express.Router();

router.route("/services/create").post(protect, IsSupperAdmin, createServices);
router.route("/services").get(getAllServices);
router
  .route("/services/:id")
  .get(servicesById)
  .put(protect, IsSupperAdmin, updateServices)
  .delete(protect, IsSupperAdmin, deleteService);
router
  .route("/services/:id/page_details")
  .post(protect, IsSupperAdmin, addPageInfo)
  .put(protect, IsSupperAdmin, updatePageInfo)
  .delete(protect, IsSupperAdmin, deletePageInfo);
module.exports = router;
