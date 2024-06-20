const Transaction = require('../model/transaction');

exports.listTransactions = async (req, res) => {
  const { search } = req.query;
  const regex = new RegExp(search, 'i');

  const query = {
    $or: [
      { title: regex },
      { description: regex },
      // { price: { $regex: regex } } // Uncomment if you want to search by price
    ],
  };

  try {
    const transactions = await Transaction.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions');
  }
};