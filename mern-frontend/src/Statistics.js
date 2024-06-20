import React, { useState } from 'react';
import axios from 'axios';

function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState('January'); // Default month
  const [year, setYear] = useState('2022'); // Default year
  const [expanded, setExpanded] = useState(false); // State to control expansion

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/statistics?month=${month.toLowerCase()}&year=${year}`); // Constructing the API URL with dynamic month and year
      setStatistics(response.data);
      setLoading(false);
      setExpanded(true); // Expand content after successful fetch
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
    }
  };
  const cleardata =() => {
    setExpanded(false);
    setStatistics(null);
  }

  return (
    <div className={`mt-10 justify-center w-auto ${expanded?'h-[250px]':'h-[50px]'}  m-3`}>
       
      {/* Button to Expand and Fetch Statistics */}
      {!expanded && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setExpanded(true)}
        >
          Statistics
        </button>
      )}

      {/* Expanded Content */}
      {expanded && (
        <div className="mb-4 -ml-10 border-2 border-gray-400 rounded p-2 scale-90 h-auto w-[400px] flex-col">
            <div className='flex'>
          <label htmlFor="month" className="mr-2 mt-1 text-2xl font-semibold">Statistics -</label>
          <select
            id="month"
            className=" text-2xl py-2 -mt-1.5 border-gray-300 rounded px-1 "
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select
            id="year"
            type="text" // Depending on your backend API, change to "number" if year is expected as number
            className=" w-20 rounded px-1 py-1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter Year"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            </select>
</div>
          {/* Fetch Statistics Button (inside expanded content) */}
          {expanded&&(
          <button
            className="px-4 py-2 flex bg-blue-500 text-white rounded mt-4"
            onClick={fetchStatistics}
            disabled={loading}
          >
          
            {loading ? 'Loading...' : 'Fetch Statistics'}
          </button>
          )}

          {/* Display Statistics */}
          {statistics && (
            <>
            <div className="mt-4 bg-amber-400 rounded-2xl w-[250px] p-2 bg-opacity-50">
              <p>Total Sales Amount: ${statistics.totalSalesAmount.toFixed(2)}</p>
              <p>Total Sold Items: {statistics.totalSoldItems}</p>
              <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
            </div>
            <div> 
            <button
            className="px-4 flex bg-red-500 h-7 text-white rounded mt-4"
            
            onClick={cleardata}
          >
            Close
          </button>
                </div></>
          )}
        </div>
      )}
    </div>
  );
}

export default Statistics;