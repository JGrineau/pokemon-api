import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemonlist.css';

const MAX_POKEMON = 151;

function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemons();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsScrolled(false);
  };

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
      const pokemonID = pokemon.url.split("/")[6];
      return pokemon.name.toLowerCase().includes(term) || pokemonID.includes(term);
    });

    displayPokemons(filteredList);
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
      <div className={`search-bar ${isScrolled ? 'hidden' : ''}`}>
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
      </div>

      <div className={`navbar-search-icon ${isScrolled ? 'visible' : ''}`}>
        <button className="search-icon-btn" onClick={() => setIsScrolled(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
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
