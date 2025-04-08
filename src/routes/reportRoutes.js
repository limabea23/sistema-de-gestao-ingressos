const express = require("express");
const router = express.Router();

const reportController = require("./../controllers/reportController");

//Rota para gerar CSV
router.get("/report/csv", reportController.exportTicketCSV);

//Rota para o PDF
router.get("/report/pdf", reportController.exportTicketPDF);

module.exports = router;