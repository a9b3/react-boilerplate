// @flow

import React             from 'react'
import { hot }           from 'react-hot-loader'
import { Route }         from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import HelloWorld        from './HelloWorld'

function MainRouter() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HelloWorld} />
    </BrowserRouter>
  )
}

export default hot(module)(MainRouter)
