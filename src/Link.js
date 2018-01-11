import React from 'react'
import history from './history'

const isLocalURLRegex = /^\//

function onClick(event) {
  const href = event.target.getAttribute('href')
  if (isLocalURLRegex.test(href)) {
    event.preventDefault()
    history.push(href)
  }
}

function Link(props) {
  return <a 
    { ...props } 
    onClick={
      props.onClick ? (...args) => {
        onClick(...args)
        props.onClick(...args)
      } : onClick
    }
  />
}

export default Link
