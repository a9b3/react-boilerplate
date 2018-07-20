// react-hot-loader/patch has to be first
import 'react-hot-loader/patch'

import './styles/global.scss'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

function renderRoot() {
  render(
    <AppContainer>
      <div>Bye</div>
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
