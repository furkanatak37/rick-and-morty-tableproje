import React from 'react';

const Pagination = ({ currentPage, pageSize, totalItems, onPageChange, onPageSizeChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
};

export default Pagination;
