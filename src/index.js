import 'normalize.css'

import React from 'react'
import { render } from 'react-dom'

import 'styles/global.scss'
import MainRouter from 'components/MainRouter'

function renderRoot() {
  render(<MainRouter />, document.getElementById('mount'))
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
