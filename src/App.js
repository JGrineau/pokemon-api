import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';
import PokemonList from './components/pokemon-list/Pokemonlist';
import PokemonDetails from './components/pokemon-details/PokemonDetails';
import UserHome from './components/user-home/UserHome';
import Compare from './components/compare/Compare';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
