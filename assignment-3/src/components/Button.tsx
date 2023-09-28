import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = ({ children, className = 'btn', onClick }: ButtonProps) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button