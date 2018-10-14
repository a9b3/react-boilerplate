// @flow

import React      from 'react'
import renderer   from 'react-test-renderer'

import HelloWorld from './HelloWorld.js'

test('Hello World', () => {
  const component = renderer.create(<HelloWorld />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
