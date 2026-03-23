const express = require("express");
const router = express.Router();
const { handleInterview } = require("../controllers/interviewController");

router.post("/interview", handleInterview);

module.exports = router;

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});