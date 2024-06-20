import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable';
import MonthSelector from './MonthSelector';
import axios from 'axios';
import Statistics from './Statistics';
import BarChart from './BarChart'; // Import the BarChart component

// import PieChart from './PieChart';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showgraph, setShowGraph] = useState(false);


  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/table/fill');
      if (response.status !== 200) {
        throw new Error('Failed to fetch transactions');
      }
      const data = response.data;
      console.log(data);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/transactions?search=${searchTerm}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch transactions');
      }
      const data = response.data;
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

    

    return (
      <div className="max-w-7xl mx-auto px-4 py-2 justify-between">
        {/* Top Section: Filters and Controls */}
        <div className="flex justify-between items-center">
          {/* Search Input */}
          <div className="flex mt-2 h-7 w-40 text-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              className="bg-blue-500 text-white px-2 rounded-r text-center"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Month Selector */}
        </div>

        {/* Main Content: Table and Charts */}
        <div className="flex h-[600px] w-[1200px] -mt-5 left-0 absolute scale-90">
          {/* Transaction Table */}
          <TransactionTable transactions={transactions} />

          {/* Charts Section */}
          {/* <div>
          <BarChart transactions={transactions} />
          <PieChart transactions={transactions} />
        </div> */}
        </div>

        <div className="absolute flex-col justify-center h-[500px] w-[400px] right-0">
          <div className='flex '>
          <Statistics />

          </div>
          <h2 className='ml-3 w-28 px-4 py-2 flex bg-blue-500 text-white rounded  h-10 cursor-pointer' 
          onClick={()=>setShowGraph(!showgraph)}
           >Bar Graph</h2>
        </div>

        {showgraph && (
          <div className='absolute  left-0 top-0 h-screen bg-black bg-opacity-70 rounded-md w-screen z-10'>
            <button className='border-2 absolute left-[82%] border-black rounded-lg p-1 top-[15%] bg-white'
            onClick={()=>setShowGraph(false)} >Close</button>
          <div className='absolute left-[20%] border top-[20%] h-[400px] bg-white rounded-md w-[1000px] z-20 '>
            
              <BarChart/>
          </div>
          </div>
          )}
        
      </div>
    );
  }

  export default DashBoard;