// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Filter from './components/Filter';
import Table from './components/Table';
import Pagination from './components/Pagination';
import './App.css';
import CharacterDetails from './components/CharacterDetails';

const App = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCharacters = async (page = 1) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
            return response.data.results;
        } catch (error) {
            setError('Veri alınırken bir hata oluştu.');
            setLoading(false);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let allCharacters = [];
            for (let i = 1; i <= 13; i++) {  // 13 sayfası var API'nın, bu da yaklaşık 250 karakter demek
                const characters = await fetchCharacters(i);
                allCharacters = [...allCharacters, ...characters];
            }
            setData(allCharacters);
            setFilteredData(allCharacters);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleFilter = (filterCriteria) => {
        const filtered = data.filter(character => {
            return character.name.toLowerCase().includes(filterCriteria.toLowerCase());
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Filtre uygulandıktan sonra sayfayı başa döndür
    };

    const handleSort = (sortCriteria) => {
        const sorted = [...filteredData].sort((a, b) => {
            if (a[sortCriteria] < b[sortCriteria]) return -1;
            if (a[sortCriteria] > b[sortCriteria]) return 1;
            return 0;
        });
        setFilteredData(sorted);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1); // Sayfa boyutu değiştirildikten sonra sayfayı başa döndür
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <Router>
            <div className="App">
                <h1 className='Title'>Rick and Morty Characters</h1>
                {error && <div className="error">{error}</div>}
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <Filter onFilter={handleFilter} onSort={handleSort} />
                                <Pagination 
                                    currentPage={currentPage} 
                                    pageSize={pageSize} 
                                    totalItems={filteredData.length} 
                                    onPageChange={handlePageChange} 
                                    onPageSizeChange={handlePageSizeChange} 
                                />
                                <Table 
                                    data={filteredData} 
                                    currentPage={currentPage} 
                                    pageSize={pageSize} 
                                />
                            </>
                        } 
                    />
                    <Route path="/character/:id" element={<CharacterDetails data={data} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
