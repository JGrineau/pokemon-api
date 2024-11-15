import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './navbar.css'
import Button from '../button/Button'
import Pokeball from '/pokemon-api/src/assets/pokeball1.jpg'

const NavBar = () => {
  const navigate = useNavigate();

  const pokedexClick = () => {
    navigate('/');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const handleHome = () => {
    navigate('/');
  }

  const handleSignup = () => {
    navigate('/signup');
  }

  return (
    <nav className='navbar'>
        <div className='left-nav'>
            <Link to="/" className='nav-item'>Pokédex</Link>
        </div>

        <div className='logo'>
          <img 
            className='pokeball' 
            src={Pokeball} 
            onClick={pokedexClick} 
            alt="Pokéball"
          />
        </div>

        <div className='right-nav'>
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
