const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

const getMonth = (monthName) => new Date(`${monthName} 1, 2020`).getMonth() + 1;

router.get('/transactions', async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    const monthNumber = getMonth(month);

    try {
        const query = { dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` } };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ];
        }

        const transactions = await Transaction.find(query).skip((page - 1) * perPage).limit(parseInt(perPage));
        const total = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, total });
    } catch (error) {
        res.status(500).send('Error fetching transactions');
    }
});

router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    const monthNumber = getMonth(month);

    try {
        const totalSales = await Transaction.aggregate([
            { $match: { dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` } } },
            { $group: { _id: null, totalAmount: { $sum: "$price" }, soldItems: { $sum: { $cond: ["$sold", 1, 0] } }, notSoldItems: { $sum: { $cond: ["$sold", 0, 1] } } } }
        ]);
        res.status(200).json(totalSales[0]);
    } catch (error) {
        res.status(500).send('Error fetching statistics');
    }
});

router.get('/bar-chart', async (req, res) => {
    const { month } = req.query;
    const monthNumber = getMonth(month);

    try {
        const ranges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const barData = await Promise.all(ranges.map(async ({ range, min, max }) => {
            const count = await Transaction.countDocuments({
                dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` },
                price: { $gte: min, $lte: max === Infinity ? Number.MAX_SAFE_INTEGER : max }
            });
            return { range, count };
        }));

        res.status(200).json(barData);
    } catch (error) {
        res.status(500).send('Error fetching bar chart data');
    }
});

router.get('/pie-chart', async (req, res) => {
    const { month } = req.query;
    const monthNumber = getMonth(month);

    try {
        const pieData = await Transaction.aggregate([
            { $match: { dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.status(200).json(pieData.map(item => ({ category: item._id, count: item.count })));
    } catch (error) {
        res.status(500).send('Error fetching pie chart data');
    }
});

router.get('/combined-data', async (req, res) => {
    const { month } = req.query;
    const monthNumber = getMonth(month);

    try {
        const [transactions, statistics, barChart, pieChart] = await Promise.all([
            Transaction.find({ dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` } }),
            Transaction.aggregate([
                { $match: { dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` } } },
                { $group: { _id: null, totalAmount: { $sum: "$price" }, soldItems: { $sum: { $cond: ["$sold", 1, 0] } }, notSoldItems: { $sum: { $cond: ["$sold", 0, 1] } } } }
            ]).then(res => res[0]),
            Promise.all(ranges.map(async ({ range, min, max }) => {
                const count = await Transaction.countDocuments({
                    dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` },
                    price: { $gte: min, $lte: max === Infinity ? Number.MAX_SAFE_INTEGER : max }
                });
                return { range, count };
            })),
            Transaction.aggregate([
                { $match: { dateOfSale: { $regex: `-${monthNumber < 10 ? '0' : ''}${monthNumber}-` } } },
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ]).then(res => res.map(item => ({ category: item._id, count: item.count })))
        ]);

        res.status(200).json({ transactions, statistics, barChart, pieChart });
    } catch (error) {
        res.status(500).send('Error fetching combined data');
    }
});

module.exports = router;
