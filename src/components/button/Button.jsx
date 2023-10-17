import React from 'react'
import "./Button.css"
const Button = (props) => {
  const {type,title,onClick,disable} = props

   return (
    <div>
      <button className={`btn ${(type==='add' && 'add' ) ||
        (type==='remove' && 'remove') ||
        (type==="checkout" && "checkout") 
      }`}
      disabled={disable}
        onClick={onClick}>
      {title}
    </button>
    </div>
  )
}

export default Button