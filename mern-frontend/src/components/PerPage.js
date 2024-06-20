import React from 'react';

function ItemsPerPage({ itemsPerPage, onItemsPerPageChange }) {
  return (
    <div className="mt-4">
      <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
      <select
        id="itemsPerPage"
        className="border rounded-md px-2 py-1"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}

export default ItemsPerPage;