import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemonlist.css';

const MAX_POKEMON = 151;

function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByNumber, setFilterByNumber] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
      const data = await response.json();
      
      // Fetch detailed data for each Pokemon
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      
      setAllPokemons(detailedPokemons);
      setFilteredPokemons(detailedPokemons);
    } catch (error) {
      console.error("Failed to fetch Pokemon list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePokemonClick = (pokemon) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const displayPokemons = (pokemonList) => {
    setNotFoundMessage(pokemonList.length === 0);
    setFilteredPokemons(pokemonList);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      displayPokemons(allPokemons);
      return;
    }

    let filteredList = allPokemons.filter((pokemon) => {
      if (filterByNumber) {
        return String(pokemon.id).startsWith(term);
      }
      if (filterByName) {
        return pokemon.name.toLowerCase().startsWith(term);
      }
      return pokemon.name.toLowerCase().includes(term) || 
             String(pokemon.id).includes(term);
    });

    displayPokemons(filteredList);
  };

  const handleFilterChange = (filterType) => {
    setFilterByNumber(filterType === 'number');
    setFilterByName(filterType === 'name');
    setSearchTerm('');
    displayPokemons(allPokemons);
  };

  const clearSearch = () => {
    setSearchTerm('');
    displayPokemons(allPokemons);
  };

  if (isLoading) {
    return (
      <div className="pokemon-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            id="search-input"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Pokémon by name or number..."
          />
          {searchTerm && (
            <button className="search-close-icon" onClick={clearSearch}>
              ×
            </button>
          )}
        </div>
        <div className="filter-options">
          <label className="filter-label">
            <input
              type="radio"
              name="filter"
              checked={!filterByName && !filterByNumber}
              onChange={() => handleFilterChange('all')}
            />
            All
          </label>
          <label className="filter-label">
            <input
              type="radio"
              name="filter"
              checked={filterByName}
              onChange={() => handleFilterChange('name')}
            />
            By Name
          </label>
          <label className="filter-label">
            <input
              type="radio"
              name="filter"
              checked={filterByNumber}
              onChange={() => handleFilterChange('number')}
            />
            By Number
          </label>
        </div>
      </div>

      {notFoundMessage ? (
        <div id="not-found-message">
          No Pokémon found matching your search.
        </div>
      ) : (
        <div className="list-wrapper">
          {filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="list-item"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <div className="number-wrap">
                <p className="caption-fonts">#{String(pokemon.id).padStart(3, '0')}</p>
              </div>
              <div className="img-wrap">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  loading="lazy"
                />
              </div>
              <div className="name-wrap">
                <p className="body3-fonts">{pokemon.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonList;
