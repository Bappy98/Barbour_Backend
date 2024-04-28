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

const router = express.Router();

router.route("/services/create").post(createServices);
router.route("/services").get(getAllServices);
router
  .route("/services/:id")
  .get(servicesById)
  .put(updateServices)
  .delete(deleteService);
router
  .route("/services/:id/page_details")
  .post(addPageInfo)
  .put(updatePageInfo)
  .delete(deletePageInfo);
module.exports = router;
