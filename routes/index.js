const express = require("express");
const AuthController = require("../controllers/authController");
const ReportController = require("../controllers/reportController");
const CheckController = require("../controllers/checkController");
const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/reports", auth, ReportController.create);
router.get("/reports", auth, ReportController.getAll);
router.get("/reports/:id", auth, ReportController.getById);
router.put("/reports/:id", auth, ReportController.update);
router.delete("/reports/:id", auth, ReportController.delete);

router.post("/check", auth, authorizeRole('user'), CheckController.checkText);

module.exports = router;
