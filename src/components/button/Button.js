import React from 'react'
import './button.css'

const Button = ({type, variant, className, id, onClick, text}) => {
  return (
    <button
        type={type}
        className={`btn ${variant} ${className}`}
        id={id}
        onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
