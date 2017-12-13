import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import { Avenue, history } from 'src/'

describe('Avenue', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
    history.push('/')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays the path', (done) => {
    render(
      <Avenue
        render={ (path) => <p>path: {path}</p> }
      />
      , node, () => {
      expect(node.textContent).toContain('path: /')

      history.push('/about')

      setTimeout(() => {
        expect(node.textContent).toContain('path: /about')
      }, 10)

      done()
    })
  })

  it('handles pathToData', () => {
    render(
      <Avenue
        pathToData={ (path) => ({ abc: 'def', path }) }
        render={ (data) => <p>abc: { data.abc }; path: {data.path}</p> }
      />
      , node, () => {
      expect(node.textContent).toContain('abc: def; path: /')
    })
  })
})
