// src/components/CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetails.css';

const CharacterDetails = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const character = data.find(c => c.id === parseInt(id));
    const [episodeNames, setEpisodeNames] = useState([]);

    useEffect(() => {
        const fetchEpisodeNames = async () => {
            try {
                const response = await axios.all(character.episode.map(url => axios.get(url)));
                const episodeNames = response.map(res => res.data.name);
                setEpisodeNames(episodeNames);
            } catch (error) {
                console.error('Bölüm isimleri getirilirken bir hata oluştu:', error);
                setEpisodeNames([]);
            }
        };

        if (character) {
            fetchEpisodeNames();
        }
    }, [character]);

    if (!character) {
        return <div>Karakter bulunamadı.</div>;
    }

    return (
        <div className="character-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
            <div className="details">
                <p><strong>Id:</strong> {character.id}</p>
                <p><strong>Name:</strong> {character.name}</p>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                <p><strong>Location:</strong> {character.location.name}</p>
                <p><strong>Type:</strong> {character.type || 'Unknown'}</p>
                <p><strong>Created:</strong> {new Date(character.created).toLocaleDateString()}</p>
                <p><strong>Episodes:</strong></p>
                <ul>
                    {episodeNames.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CharacterDetails;
