import { useState, useEffect } from 'react';
import axios from 'axios';

const useCharacters = (filters, sort, page, pageSize) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          ...filters,
          page,
          pageSize,
        };

        const response = await axios.get('https://rickandmortyapi.com/api/character', { params });

        setCharacters(response.data.results);
        setTotal(response.data.info.count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filters, sort, page, pageSize]);

  return { characters, loading, error, total };
};

export default useCharacters;
