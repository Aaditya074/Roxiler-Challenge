import React, { useState, useMemo,useEffect } from 'react';
import Pagination from './Pagination';
import ItemsPerPageSelector from './PerPageSelector';

function TransactionTable({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions); // Initialize with all transactions
  const [isFiltered, setIsFiltered] = useState(false); // Track if filter is applied

  // Calculate total pages based on itemsPerPage
  const totalTransactions = filteredTransactions.length;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);
  useEffect(() => {
    setFilteredTransactions(transactions); // Reset to all transactions
    setSelectedMonth(''); // Reset selected month
    setSelectedYear(''); // Reset selected year
    setIsFiltered(false); // Reset filter applied flag
    setCurrentPage(1); // Reset pagination to first page
  }, [transactions]);
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handle month change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Handle year change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Handle filter by month and year
  const handleFilter = () => {
    let filtered = transactions;

    // Apply month filter if selected
    if (selectedMonth !== '') {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.dateOfSale);
        const transactionMonth = transactionDate.getMonth() + 1;
        return transactionMonth === Number(selectedMonth);
      });
    }

    // Apply year filter if selected
    if (selectedYear !== '') {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.dateOfSale);
        const transactionYear = transactionDate.getFullYear();
        return transactionYear === Number(selectedYear);
      });
    }

    setFilteredTransactions(filtered);
    setIsFiltered(true); // Set filter applied flag
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Clear filter and show all entries
  const clearFilter = () => {
    setFilteredTransactions(transactions); // Reset to all transactions
    setSelectedMonth(''); // Reset selected month
    setSelectedYear(''); // Reset selected year
    setIsFiltered(false); // Reset filter applied flag
    setCurrentPage(1); // Reset pagination to first page
  };

  // Memoize visibleTransactions to avoid re-calculating on every render
  const visibleTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredTransactions]);

  return (
    <div className='flex-col scale-90 '>
      <div className="bg-white shadow-md rounded-lg p-2 overflow-scroll no-scrollbar" style={{ maxHeight: '800px', width: '1200px' }}>

        {/* Month and Year selection */}
        <div className="mb-4 flex items-center">
          <label htmlFor="month" className="mr-2"> 
            <h2 className="text-2xl font-bold mb-4">Transaction Table</h2>
          </label>
          <select
            id="month"
            className="border border-gray-300 rounded px-3 -mt-3"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <label htmlFor="year" className="ml-4 mr-2 -mt-3">Year:</label>
          <select
            id="year"
            type="number"
            className="border border-gray-300 -mt-3 rounded px-3 py-1"
            value={selectedYear}
            onChange={handleYearChange}
            placeholder="Enter Year"
          >
             <option value="2021">2021</option>
             <option value="2022">2022</option>
          </select>
          
          {/* Filter and clear filter buttons */}
          {!isFiltered ? (
            <button className="ml-4 px-3 -mt-3 py-1 bg-blue-500 text-white rounded" onClick={handleFilter}>Filter</button>
          ) : (
            <button className="ml-4 px-3 py-1 -mt-3 bg-red-500 text-white rounded" onClick={clearFilter}>Clear Filter</button>
          )}
        </div>

        {/* Transaction table */}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 overflow-scroll ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-gray-200 overflow-scroll ">
                <thead className=" bg-amber-500 bg-opacity-30">
                  <tr>
                    <th scope="col" className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '10%' }}>
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '300px' }}>
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '300px' }}>
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                      Sold
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-amber-400 bg-opacity-20 divide-y divide-x divide-gray-700 overflow-y-auto">
                  {visibleTransactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 m-2 whitespace-nowrap overflow-x-scroll no-scrollbar" style={{ maxWidth: '100px', overflow: 'scroll' }}>{transaction._id}</td>
                      <td className="px-6 py-4 m-2 whitespace-nowrap overflow-x-scroll no-scrollbar" style={{ maxWidth: '300px', overflow: 'scroll' }}>{transaction.title}</td>
                      <td className="px-6 py-4 m-2 whitespace-nowrap overflow-x-scroll no-scrollbar" style={{ maxWidth: '300px', overflow: 'scroll' }}>{transaction.description}</td>
                      <td className="px-6 py-4 m-2 whitespace-nowrap overflow-x-scroll no-scrollbar" style={{ maxWidth: '100px', overflow: 'scroll' }}>${transaction.price}</td>
                      <td className="px-6 py-4 m-2 whitespace-nowrap overflow-x-scroll no-scrollbar" style={{ maxWidth: '100px', overflow: 'scroll' }}>{transaction.category}</td>
                      <td className="px-6 py-4 m-2 whitespace-nowrap overflow-x-scroll no-scrollbar" style={{ maxWidth: '100px', overflow: 'scroll' }}>{transaction.sold ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination and items per page selector */}
        <div className='flex justify-between'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          <ItemsPerPageSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} />
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;