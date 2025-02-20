import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import './PokemonDetails.css';

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
};

const PokemonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        pokemon,
        isLoading,
        error,
        getEnglishFlavorText,
        handlePrevPokemon,
        handleNextPokemon,
        MAX_POKEMON
    } = usePokemonDetails(id);

    const getMainTypeColor = () => {
        if (!pokemon || !pokemon.types.length) return '#A8A878';
        const mainType = pokemon.types[0].type.name;
        return typeColors[mainType] || '#A8A878';
    };

    if (error) {
        return (
            <div className="detail-main main">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/')}>Back to List</button>
                </div>
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

    const mainColor = getMainTypeColor();
    const mainStyle = {
        backgroundColor: mainColor,
        borderColor: mainColor
    };

    return (
        <main className="detail-main main" style={mainStyle}>
            <header className="header">
                <div className="header-wrapper">
                    <div className="header-wrap">
                        <button onClick={() => navigate('/')} className="back-btn-wrap" style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
                            <img src="/assets/back-to-home.svg" alt="back to home" className="back-btn" />
                        </button>
                        <div className="name-wrap">
                            <h1 className="name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                        </div>
                    </div>
                    <div className="pokemon-id-wrap">
                        <p className="body2-fonts">#{String(pokemon.id).padStart(3, '0')}</p>
                    </div>
                </div>
            </header>
            <div className="featured-img">
                {parseInt(id) > 1 && (
                    <button className="arrow left-arrow" onClick={handlePrevPokemon} style={{ background: 'none', border: 'none' }}>
                        <img src="/assets/chevron_left.svg" alt="back" />
                    </button>
                )}
                <div className="detail-img-wrapper">
                    <img 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                        alt={pokemon.name}
                        onError={(e) => {
                            e.target.src = pokemon.sprites.front_default;
                        }}
                    />
                </div>
                {parseInt(id) < MAX_POKEMON && (
                    <button className="arrow right-arrow" onClick={handleNextPokemon} style={{ background: 'none', border: 'none' }}>
                        <img src="/assets/chevron_right.svg" alt="next" />
                    </button>
                )}
            </div>
            <div className="detail-card-detail-wrapper">
                <div className="power-wrapper">
                    {pokemon.types.map((type, index) => (
                        <p 
                            key={index} 
                            className={`body3-fonts type ${type.type.name}`}
                            style={{ backgroundColor: typeColors[type.type.name] }}
                        >
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
                    {getEnglishFlavorText()}
                </p>
                <p className="body2-fonts about-text">Base Stats</p>
                <div className="stats-wrapper">
                    {pokemon.stats.map((stat, index) => (
                        <div key={index} className="stats-wrap" data-stat={stat.stat.name}>
                            <p className="body3-fonts stats" style={{ color: mainColor }}>
                                {stat.stat.name.toUpperCase().slice(0, 4)}
                            </p>
                            <p className="body3-fonts">{String(stat.base_stat).padStart(3, '0')}</p>
                            <progress 
                                value={stat.base_stat} 
                                max="100" 
                                className="progress-bar"
                                style={{
                                    '--progress-color': mainColor,
                                    '--progress-background': `${mainColor}80`
                                }}
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
