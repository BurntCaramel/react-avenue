import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Avenue from './Avenue'
import history from './history'

describe('Avenue', () => {
  let node
  let catchCount = 0

  class Catcher extends React.Component {
    componentDidCatch(error, info) {
      catchCount += 1
      console.error('componentDidCatch', error, info)
    }

    render() {
      return this.props.children
    }
  }

  beforeEach(() => {
    node = document.createElement('div')
    history.push('/')

    catchCount = 0
  })

  afterEach(() => {
    unmountComponentAtNode(node)

    expect(catchCount).toBe(0)
  })

  it('displays the path', (done) => {
    render(
      <Catcher>
        <Avenue
          render={ ({ path, route }) => <p>path: {path}; route: {route}</p> }
        />
      </Catcher>
      , node, () => {
      expect(node.textContent).toContain('path: /; route: /')

      history.push('/about')
      setTimeout(() => {
        expect(node.textContent).toContain('path: /about; route: /about')
        done()
      }, 10)
    })
  })

  it('uses processPath', (done) => {
    render(
      <Catcher>
        <Avenue
          processPath={ (path) => ({ abc: 'def', path }) }
          render={ ({ route }) => <p>abc: { route.abc }; path: {route.path}</p> }
        />
      </Catcher>
      , node, () => {
      expect(node.textContent).toContain('abc: def; path: /')
      
      done()
    })
  })
})
