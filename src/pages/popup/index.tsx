import React from 'react'
import { render } from 'react-dom'
import App from './App'

// const root = document.querySelector('#root')
// render(<App />, root)

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  document.body.insertBefore(injectDOM, document.body.firstChild);
  render(
      <App />,  injectDOM
  )
})
