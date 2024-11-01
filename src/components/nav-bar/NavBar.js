import React from 'react'
import './navbar.css'
import Button from '../button/Button'
import Pokeball from '/pokemon-api/src/assets/pokeball1.jpg'

const NavBar = () => {

  const pokedexClick = () =>{
    console.log('Button clicked')
  }

  return (
    <div className='navbar'>

        <div className='left-nav'>
            <a className='nav-item' href='#'>Pokedex</a>
        </div>

        <div className='logo' >
         <img className='pokeball' src={Pokeball} onClick={pokedexClick} />
        </div>

        <div className='right-nav'>
            
            
                <Button variant={"primary"} className='nav-item' onClick={pokedexClick} text="Home" />
                <Button variant={"primary"} className='nav-item' onClick={pokedexClick} text="Login" />
                <Button variant={"primary"} className='nav-item' onClick={pokedexClick} text="Signup" />
        </div> 
    </div> /*navbar */
  )
}

export default NavBar













