const express = require('express');
const router = express.Router();

const { initializeDatabase } = require('../features/initialize');
const { listTransactions } = require('../features/Transactions');
const { getStatistics } = require('../features/Statistics');
const { getBarChart } = require('../features/BarChart');
const { getPieChart } = require('../features/PieChart');
const { getCombinedData } = require('../features/combined');

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;