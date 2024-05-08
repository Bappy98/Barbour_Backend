const express = require("express");
const {
  createServices,
  getAllServices,
  servicesById,
  updateServices,
  deleteService,
  addPageInfo,
  deletePageInfoById,
  updatePageInfo,
  
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
  .route("/services/page_details")
  .post(protect, IsSupperAdmin, addPageInfo)
router.route("/services/page_details/:id")
.delete(protect,IsSupperAdmin,deletePageInfoById)
.put(protect,IsSupperAdmin,updatePageInfo)
 
module.exports = router;
