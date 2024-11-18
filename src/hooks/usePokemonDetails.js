import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MAX_POKEMON = 151;

export const usePokemonDetails = (id) => {
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [pokemonSpecies, setPokemonSpecies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Validate Pokemon ID
                const pokemonId = parseInt(id);
                if (pokemonId < 1 || pokemonId > MAX_POKEMON) {
                    throw new Error(`Pokemon ID must be between 1 and ${MAX_POKEMON}`);
                }

                // Fetch both Pokemon and Species data in parallel
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
    }, [id, navigate]);

    const getEnglishFlavorText = () => {
        if (!pokemonSpecies) return '';
        const entry = pokemonSpecies.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );
        return entry ? entry.flavor_text.replace(/\\f/g, ' ') : '';
    };

    const handlePrevPokemon = (e) => {
        e.preventDefault();
        if (parseInt(id) > 1) {
            navigate(`/pokemon/${parseInt(id) - 1}`);
        }
    };

    const handleNextPokemon = (e) => {
        e.preventDefault();
        if (parseInt(id) < MAX_POKEMON) {
            navigate(`/pokemon/${parseInt(id) + 1}`);
        }
    };

    return {
        pokemon,
        pokemonSpecies,
        isLoading,
        error,
        getEnglishFlavorText,
        handlePrevPokemon,
        handleNextPokemon,
        MAX_POKEMON
    };
};
