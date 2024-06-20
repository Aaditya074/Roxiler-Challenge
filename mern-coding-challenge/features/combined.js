const axios = require('axios');

async function getCombinedData(req, res) {
  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://127.0.0.1:5000/api/transactions`, { params: req.query }),
      axios.get(`http://127.0.0.1:5000/api/statistics`, { params: req.query }),
      axios.get(`http://127.0.0.1:5000/api/barchart`, { params: req.query }),
      axios.get(`http://127.0.0.1:5000/api/piechart`, { params: req.query })
    ]);

    const combinedData = {
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).send('Error fetching combined data');
  }
}

module.exports = {
  getCombinedData  // Exporting the function as an object property
};