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
      setAllPokemons(data.results);
      setFilteredPokemons(data.results);
    } catch (error) {
      console.error("Failed to fetch Pokemon list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokemonDataBeforeRedirect = async (id) => {
    try {
      await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
      ]);
      navigate(`/pokemon/${id}`);
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
    }
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
        const pokemonID = pokemon.url.split("/")[6];
        return pokemonID.startsWith(term);
      }
      if (filterByName) {
        return pokemon.name.toLowerCase().startsWith(term);
      }
      return true;
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
            <button onClick={clearSearch} className="search-close-icon">
              ✕
            </button>
          )}
        </div>
        <div className="filter-options">
          <label className="filter-label">
            <input
              type="radio"
              id="number"
              checked={filterByNumber}
              onChange={() => handleFilterChange('number')}
            />
            Filter by Number
          </label>
          <label className="filter-label">
            <input
              type="radio"
              id="name"
              checked={filterByName}
              onChange={() => handleFilterChange('name')}
            />
            Filter by Name
          </label>
        </div>
      </div>
      
      {notFoundMessage && (
        <p id="not-found-message">
          No Pokémon found matching your search criteria
        </p>
      )}

      <div className="list-wrapper">
        {filteredPokemons.map((pokemon) => {
          const pokemonID = pokemon.url.split("/")[6];
          return (
            <div
              key={pokemonID}
              className="list-item"
              onClick={() => fetchPokemonDataBeforeRedirect(pokemonID)}
            >
              <div className="number-wrap">
                <p className="caption-fonts">#{pokemonID.padStart(3, '0')}</p>
              </div>
              <div className="img-wrap">
                <img
                  src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                  alt={pokemon.name}
                  loading="lazy"
                />
              </div>
              <div className="name-wrap">
                <p className="body3-fonts">{pokemon.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;
