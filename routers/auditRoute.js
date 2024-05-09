const express = require("express");
const {
  createAudit,
  getAudit,
  updateAudit,
  deleteAudit,
} = require("../controllers/businessAuditController");
const { protect, IsSupperAdmin } = require("../middleware/auth");
const router = express.Router();

router
  .route("/business_audit/create")
  .post(protect, IsSupperAdmin, createAudit);
router.route("/business_audit").get(getAudit);
router
  .route("/business_audit/:id")
  .put(protect, IsSupperAdmin, updateAudit)
  .delete(protect, IsSupperAdmin, deleteAudit);

module.exports = router;
