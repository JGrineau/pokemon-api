import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Not logged in, redirect to login
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    // Get favorites from localStorage
    const favs = localStorage.getItem('favorites');
    setFavorites(favs ? JSON.parse(favs) : []);
  }, [navigate]);

  const handleRemoveFavorite = (pokemonId) => {
    const updated = favorites.filter(fav => fav.id !== pokemonId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="user-home-container">
      <h2>Welcome, {user?.username || 'Trainer'}!</h2>
      <h3>Your Favorite Pokémon</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet. Go add some from the Pokémon list!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(pokemon => (
            <div key={pokemon.id} className="favorite-pokemon-card">
              <img src={pokemon.image} alt={pokemon.name} height={80} />
              <div>
                <p>{pokemon.name}</p>
                <button onClick={() => handleRemoveFavorite(pokemon.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHome;
