import React from 'react';

function MonthSelector() {
  // Example months (replace with actual month names)
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    // Add more months as needed
  ];

  return (
    <div className="flex items-center space-x-4">
      <span>Select Month:</span>
      <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none">
        {months.map((month) => (
          <option key={month.value} value={month.value}>{month.label}</option>
        ))}
      </select>
    </div>
  );
}

export default MonthSelector;