const Transaction = require('../model/transaction');

exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2023-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const result = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } }
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
};