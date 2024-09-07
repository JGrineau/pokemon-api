import React from 'react'
import './navbar.css'

const NavBar = () => {
  return (
    <div className='navbar'>

        <div className='left-nav'>
            <a className='nav-item' href='#'>Pokedex</a>
        </div>

        <div className='logo'>
        <img src='your-logo-url-here.png' alt='Logo' />
        </div>

        <div className='right-nav'>
            
                <a className='nav-item' href='#'>Home</a>
                <a className='nav-item' href='#'>Login</a>
                <a className='nav-item' href='#'>Sign Up</a>
        </div> 

      

      
    </div> /*navbar */
  )
}

export default NavBar













