import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilter, onSort }) => {
    const [filterText, setFilterText] = useState('');
    const [sortField, setSortField] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        onFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortField(e.target.value);
        onSort(e.target.value);
    };

    return (
        <div className="filter-container">
            <input
                type="text"
                placeholder="Filter by name"
                value={filterText}
                onChange={handleFilterChange}
            />
            <div className="sort-container">
                <label htmlFor="sort">Sort by {}  
                <select id="sort" value={sortField} onChange={handleSortChange}>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="species">Species</option>
                    
                </select>
                </label>
            </div>
        </div>
    );
};

export default Filter;
