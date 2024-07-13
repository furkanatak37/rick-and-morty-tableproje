import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Details = ({ character }) => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            const episodePromises = character.episode.map(url => axios.get(url));
            const episodeResponses = await Promise.all(episodePromises);
            const episodeData = episodeResponses.map(response => response.data);
            setEpisodes(episodeData);
        };

        fetchEpisodes();
    }, [character]);

    return (
        <div className="details">
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
            <h3>Episodes:</h3>
            <ul>
                {episodes.map(episode => (
                    <li key={episode.id}>{episode.name} (Season {episode.episode.split('S')[1].split('E')[0]}, Episode {episode.episode.split('E')[1]})</li>
                ))}
            </ul>
        </div>
    );
};

export default Details;
