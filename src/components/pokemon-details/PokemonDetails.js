import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetails.css';

const PokemonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [pokemonSpecies, setPokemonSpecies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setIsLoading(true);
                const [pokemonResponse, speciesResponse] = await Promise.all([
                    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                ]);

                if (!pokemonResponse.ok || !speciesResponse.ok) {
                    throw new Error('Pokemon not found');
                }

                const [pokemonData, speciesData] = await Promise.all([
                    pokemonResponse.json(),
                    speciesResponse.json()
                ]);

                setPokemon(pokemonData);
                setPokemonSpecies(speciesData);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching Pokemon:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemonData();
    }, [id]);

    const handlePrevPokemon = () => {
        if (parseInt(id) > 1) {
            navigate(`/pokemon/${parseInt(id) - 1}`);
        }
    };

    const handleNextPokemon = () => {
        if (parseInt(id) < 151) {
            navigate(`/pokemon/${parseInt(id) + 1}`);
        }
    };

    if (error) {
        return (
            <div className="detail-main main">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Back to List</button>
            </div>
        );
    }

    if (isLoading || !pokemon) {
        return (
            <div className="detail-main main">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="detail-main main">
            <header className="header">
                <div className="header-wrapper">
                    <div className="header-wrap">
                        <a onClick={() => navigate('/')} className="back-btn-wrap" style={{ cursor: 'pointer' }}>
                            <img
                                src="/assets/back-to-home.svg"
                                alt="back to home"
                                className="back-btn"
                                id="back-btn"
                            />
                        </a>
                        <div className="name-wrap">
                            <h1 className="name">
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                            </h1>
                        </div>
                    </div>
                    <div className="pokemon-id-wrap">
                        <p className="body2-fonts">#{String(pokemon.id).padStart(3, '0')}</p>
                    </div>
                </div>
            </header>
            <div className="featured-img">
                <a href="#" className="arrow left-arrow" onClick={handlePrevPokemon}>
                    <img src="/assets/chevron_left.svg" alt="back" />
                </a>
                <div className="detail-img-wrapper">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <a href="#" className="arrow right-arrow" onClick={handleNextPokemon}>
                    <img src="/assets/chevron_right.svg" alt="forward" />
                </a>
            </div>
            <div className="detail-card-detail-wrapper">
                <div className="power-wrapper">
                    {pokemon.types.map((type, index) => (
                        <p key={index} className={`body3-fonts type ${type.type.name}`}>
                            {type.type.name}
                        </p>
                    ))}
                </div>
                <p className="body2-fonts about-text">About</p>
                <div className="pokemon-detail-wrapper">
                    <div className="pokemon-detail-wrap">
                        <div className="pokemon-detail">
                            <img src="/assets/weight.svg" alt="weight" />
                            <p className="body3-fonts weight">{pokemon.weight / 10} kg</p>
                        </div>
                        <p className="caption-fonts">Weight</p>
                    </div>
                    <div className="pokemon-detail-wrap">
                        <div className="pokemon-detail">
                            <img src="/assets/height.svg" alt="height" className="straighten" />
                            <p className="body3-fonts height">{pokemon.height / 10} m</p>
                        </div>
                        <p className="caption-fonts">Height</p>
                    </div>
                    <div className="pokemon-detail-wrap">
                        <div className="pokemon-detail move">
                            {pokemon.abilities.map((ability, index) => (
                                <p key={index} className="body3-fonts">
                                    {ability.ability.name.replace('-', ' ')}
                                </p>
                            ))}
                        </div>
                        <p className="caption-fonts">Moves</p>
                    </div>
                </div>
                <p className="body3-fonts pokemon-description">
                    {pokemonSpecies?.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text.replace(/\\f/g, ' ')}
                </p>
                <p className="body2-fonts about-text">Base Stats</p>
                <div className="stats-wrapper">
                    {pokemon.stats.slice(0, 4).map((stat, index) => (
                        <div key={index} className="stats-wrap" data-stat={stat.stat.name}>
                            <p className="body3-fonts stats">
                                {stat.stat.name.toUpperCase().slice(0, 4)}
                            </p>
                            <p className="body3-fonts">{stat.base_stat}</p>
                            <progress 
                                value={stat.base_stat} 
                                max="100" 
                                className="progress-bar"
                            ></progress>
                        </div>
                    ))}
                </div>
            </div>
            <img src="/assets/pokedex.svg" alt="pokedex" className="detail-bg" />
        </main>
    );
};

export default PokemonDetails;