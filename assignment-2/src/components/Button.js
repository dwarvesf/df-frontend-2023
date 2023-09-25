import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, className = 'btn', onClick }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default Button