import React, {Component} from 'react'
import {render} from 'react-dom'

import { Avenue } from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-avenue Demo</h1>
      <Avenue render={ (path) => (
        <div>{ path }</div>
      ) } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
