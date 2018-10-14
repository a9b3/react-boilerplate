// @flow

import React  from 'react'

import styles from './HelloWorld.scss'

export default class HelloWorld extends React.PureComponent<{}> {
  render() {
    return <div className={styles.hello}>Hello World</div>
  }
}
