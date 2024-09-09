import React from 'react'
import './navbar.css'
import Button from '../button/Button'

const NavBar = () => {

  const pokedexClick = () =>{
    console.log('Button clicked')
  }

  return (
    <div className='navbar'>

        <div className='left-nav'>
            <a className='nav-item' href='#'>Pokedex</a>
        </div>

        <div className='logo'>
        <img src='your-logo-url-here.png' alt='Logo' />
        </div>

        <div className='right-nav'>
            
            
                <Button variant={"primary"} className='nav-item' onClick={pokedexClick} text="Home" />
                <a className='nav-item' href='#'>Login</a>
                <a className='nav-item' href='#'>Sign Up</a>
        </div> 
    </div> /*navbar */
  )
}

export default NavBar













