const Transaction = require('../model/transaction');

exports.getBarChart = async (req, res) => {
  const { month } = req.query;

  // Validate month input
  const numericMonth = parseInt(month, 10);
  if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
    return res.status(400).send('Invalid month provided');
  }

  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity },
  ];

  try {
    // Initialize an array to store filtered results
    const filteredResults = [];

    // Loop through each possible year (adjust range as needed)
    for (let year = 2021; year <= 2022; year++) {
      // Calculate start and end dates for the specified month and year
      const startDate = new Date();
      startDate.setFullYear(year); // Set the year
      startDate.setMonth(numericMonth - 1, 1); // Months are zero-indexed (0 = January, ..., 11 = December)
      startDate.setHours(0, 0, 0, 0); // Start of the day

      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1); // Next month
      endDate.setDate(0); // Set to the last day of the current month
      endDate.setHours(23, 59, 59, 999); // End of the day

      // Fetch counts for each price range for the current year and month
      const result = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: min, $lt: max }
        });
        return { range, count };
      }));

      // Check if all counts for the current year are zero
      const allZeroCounts = result.every(entry => entry.count === 0);

      // If not all counts are zero, add the year's data to filteredResults
      if (!allZeroCounts) {
        filteredResults.push({ year, data: result });
      }
    }

    // Return filtered results for the requested month across years
    res.status(200).json(filteredResults);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).send('Error fetching bar chart data');
  }
};