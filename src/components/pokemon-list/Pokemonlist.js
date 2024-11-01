import React, { useState, useEffect } from 'react';

const MAX_POKEMON = 151;

function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByNumber, setFilterByNumber] = useState(false);
  const [filterByName, setFilterByName] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPokemons(data.results);
        setFilteredPokemons(data.results);
      });
  }, []);

  const fetchPokemonDataBeforeRedirect = async (id) => {
    try {
      const [pokemon, pokemonSpecies] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
      ]);
      return true;
    } catch (error) {
      console.error("Failed to fetch Pokemon data before redirect");
      return false;
    }
  };

  const displayPokemons = (pokemonList) => {
    if (pokemonList.length === 0) {
      setNotFoundMessage(true);
    } else {
      setNotFoundMessage(false);
    }
    setFilteredPokemons(pokemonList);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    let filteredList;
    if (filterByNumber) {
      filteredList = allPokemons.filter((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        return pokemonID.startsWith(term);
      });
    } else if (filterByName) {
      filteredList = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(term)
      );
    } else {
      filteredList = allPokemons;
    }

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

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Pokémon..."
        />
        <button onClick={clearSearch} className="search-close-icon">Clear</button>
        <div>
          <label>
            <input
              type="radio"
              id="number"
              checked={filterByNumber}
              onChange={() => handleFilterChange('number')}
            />
            Filter by Number
          </label>
          <label>
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
      
      {notFoundMessage && <p id="not-found-message">No Pokémon found</p>}

      <div className="list-wrapper">
        {filteredPokemons.map((pokemon) => {
          const pokemonID = pokemon.url.split("/")[6];
          return (
            <div
              key={pokemonID}
              className="list-item"
              onClick={async () => {
                const success = await fetchPokemonDataBeforeRedirect(pokemonID);
                if (success) {
                  window.location.href = `./detail.html?id=${pokemonID}`;
                }
              }}
            >
              <div className="number-wrap">
                <p className="caption-fonts">#{pokemonID}</p>
              </div>
              <div className="img-wrap">
                <img
                  src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
                  alt={pokemon.name}
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
