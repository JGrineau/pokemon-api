import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './navbar.css'
import Button from '../button/Button'
import Pokeball from '../../assets/pokeball1.jpg'

const NavBar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pokedexClick = () => {
    navigate('/');
  }



  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className='navbar'>
        <div className='left-nav'>
            <Link to="/" className='nav-item desktop-only'>Pokédex</Link>
            {isScrolled && (
              <button className="nav-search-icon" onClick={scrollToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            )}
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

        <div className='right-nav'>

            <Button 
              variant="secondary" 
              className='nav-item' 
              onClick={() => navigate('/compare')} 
              text="Compare" 
            />
        </div> 
    </nav>
  )
}

export default NavBar
