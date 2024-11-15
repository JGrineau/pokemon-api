import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';
import Login from './components/login-page/Login';
import PokemonList from './components/pokemon-list/Pokemonlist';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
