import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = async (month) => {
  const url = `http://127.0.0.1:5000/api/barchart?month=${month}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

const BarGraph = ({ data }) => {
  const allCountsZero = data.every(item => item.count === 0);

  if (allCountsZero) {
    return <div className="text-center text-gray-500">No data available for the selected month and year.</div>;
  }

  const maxCount = Math.max(...data.map(item => item.count));

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[800px]">
      <div className="flex">
        {/* Left side with counts */}
        <div className="flex flex-col justify-between mr-4 mb-8">
          {[...Array(maxCount + 1)].map((_, index) => (
            <div key={index} className="text-right mb-2">
              {maxCount - index}
            </div>
          ))}
        </div>

        {/* Graph bars */}
        <div className="flex-1">
          <div className="grid grid-cols-10 gap-">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-12 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-blue-500"
                    style={{ height: `${(item.count / maxCount) * 100}%` }}
                  ></div>
                </div>
                <div className="mb-2 text-xs mt-4 -rotate-45">{item.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const handleFetchData = async () => {
    const result = await fetchData(month);
    setData(result[0].data);
    setShowGraph(true);
  };

  return (
    <div className="container mx-auto mt-8 ml-20">
      <div className="mb-4">
        <label className=" justify-center font-semibold text-3xl">Bar Chart Stats - </label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className=" p-2 font-semibold text-3xl w-48 border-gray-300  rounded"
        > 
          <option className='text-sm' value="">Month</option>
          <option className='text-sm' value="1">January</option>
          <option className='text-sm' value="2">February</option>
          <option className='text-sm' value="3">March</option>
          <option className='text-sm' value="7">July</option>
          <option className='text-sm' value="8">August</option>
          <option className='text-sm' value="9">September</option>
          <option className='text-sm' value="10">October</option>
          <option className='text-sm' value="11">November</option>
          <option className='text-sm' value="12">December</option>
        </select>
        <span className='text-xs italic m-2 py-2 '>(Select month from Dropdown)</span>
        <button
          onClick={handleFetchData}
          className="ml-4 p-2 bg-blue-500 text-white rounded"
        >
          Show Graph
        </button>
      </div>
      {showGraph && <BarGraph data={data} />}
    </div>
  );
};

export default App;