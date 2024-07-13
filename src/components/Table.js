// src/components/Table.js
import React from 'react';
import './Table.css';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, currentPage, pageSize }) => {
    const navigate = useNavigate();

    const handleRowClick = (character) => {
        navigate(`/character/${character.id}`, { target: "_blank" });
    };

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(startIndex, startIndex + pageSize);

    if (paginatedData.length === 0) {
        return <div className="no-characters">Karakter bulunamadı.</div>;
    }

    return (
        <div className="table-container">
            {paginatedData.reduce((rows, character, index, array) => {
                if (index % 2 === 0) {
                    rows.push(
                        <div className="row" key={character.id}>
                            <div className="column" onClick={() => handleRowClick(character)}>
                                <img src={character.image} alt={character.name} width="50" height="50" />
                                <div className="details">
                                    <div><strong style={{ color: 'black' }}>Id:</strong> {character.id}</div>
                                    <div><strong style={{ color: 'black' }}>Name:</strong> {character.name}</div>
                                    <div><strong style={{ color: 'black' }}>Status:</strong> {character.status}</div>
                                    <div><strong style={{ color: 'black' }}>Species:</strong> {character.species}</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '165px',padding:'15px' }}>
                                        <label style={{ color: 'black' }}>Click for more info</label>
                                            </div>
                                 </div>
                            {array[index + 1] && (
                                <div className="column" onClick={() => handleRowClick(array[index + 1])}>
                                    <img src={array[index + 1].image} alt={array[index + 1].name} width="50" height="50" />
                                    <div className="details">
                                        <div><strong style={{ color: 'black' }}>Id:</strong> {array[index + 1].id}</div>
                                        <div><strong style={{ color: 'black' }}>Name:</strong> {array[index + 1].name}</div>
                                        <div><strong style={{ color: 'black' }}>Status:</strong> {array[index + 1].status}</div>
                                        <div><strong style={{ color: 'black' }}>Species:</strong> {array[index + 1].species}</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '165px',padding:'15px' }}>
                                        <label style={{ color: 'black' }}>Click for more info</label>
                                            </div>
                                </div>
                                
                            )}
                        </div>
                    );
                }
                return rows;
            }, [])}
        </div>
    );
};

export default Table;
