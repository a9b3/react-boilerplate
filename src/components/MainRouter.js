// @flow

import React             from 'react'
import { Route }         from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import HelloWorld        from './HelloWorld'

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HelloWorld} />
    </BrowserRouter>
  )
}
