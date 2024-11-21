import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './navbar.css'
import Button from '../button/Button'
import Pokeball from '/pokemon-api/src/assets/pokeball1.jpg'

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pokedexClick = () => {
    navigate('/');
  }

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  }

  const handleHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  }

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className='navbar'>
        <div className='left-nav'>
            <Link to="/" className='nav-item desktop-only'>Pokédex</Link>
        </div>

        <div className='mobile-nav'>
          <div className='logo mobile-logo' onClick={pokedexClick}>
            <img 
              className='pokeball' 
              src={Pokeball}
              alt="Pokéball"
            />
          </div>
        </div>

        <div className='center-logo desktop-only'>
          <div className='logo' onClick={pokedexClick}>
            <img 
              className='pokeball' 
              src={Pokeball}
              alt="Pokéball"
            />
          </div>
        </div>

        <button className='hamburger' onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`right-nav ${isMenuOpen ? 'active' : ''}`}>
            <Button 
              variant="primary" 
              className='nav-item' 
              onClick={handleHome} 
              text="Home" 
            />
            <Button 
              variant="primary" 
              className='nav-item' 
              onClick={handleLogin} 
              text="Login" 
            />
            <Button 
              variant="primary" 
              className='nav-item' 
              onClick={handleSignup} 
              text="Sign Up" 
            />
        </div> 
    </nav>
  )
}

export default NavBar
