import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';
import Login from './components/login-page/Login';
import PokemonList from './components/pokemon-list/Pokemonlist';
import PokemonDetails from './components/pokemon-details/PokemonDetails';
import Signup from './components/signup-page/Signup';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
