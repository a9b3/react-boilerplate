// react-hot-loader/patch has to be first
import 'react-hot-loader/patch'

import 'normalize.css'
import './styles/global.scss'

import React from 'react'
import MainRouter from 'components/MainRouter'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

function renderRoot() {
  render(
    <AppContainer>
      <MainRouter />
    </AppContainer>,
    document.getElementById('mount'),
  )
}

function main() {
  renderRoot()

  if (module.hot) {
    module.hot.accept('./styles/global.scss', () => {
      require('./styles/global.scss')
    })
    module.hot.accept(renderRoot)
  }
}

main()
