import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import Link from './Link'
import history from './history'

describe('Link', () => {
  let node
  const $ = (selector) => node.querySelector(selector)
  let catchCount = 0
  let visitedLocations = null
  let unlistenToHistory = null

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
    visitedLocations = []

    unlistenToHistory = history.listen((location) => {
      visitedLocations.push(location)
    })

    catchCount = 0
  })

  afterEach(() => {
    unmountComponentAtNode(node)

    unlistenToHistory()
    unlistenToHistory = null

    expect(catchCount).toBe(0)
  })

  it('renders href', (done) => {
    render(
      <Catcher>
        <Link
          href='/about'
        />
      </Catcher>
      , node, () => {
      expect(node.childElementCount).toEqual(1)
      expect(node.firstChild.tagName).toEqual('A')
      expect(node.firstChild.getAttribute('href')).toEqual('/about')
      done()
    })
  })

  it('renders className', (done) => {
    render(
      <Catcher>
        <Link
          className='first second'
        />
      </Catcher>
      , node, () => {
      expect(node.childElementCount).toEqual(1)
      expect(node.firstChild.tagName).toEqual('A')
      expect(node.firstChild.className).toEqual('first second')
      done()
    })
  })

  it('renders other attributes', (done) => {
    render(
      <Catcher>
        <Link
          rel='noopener noreferrer'
          data-abc='def'
          aria-label='Link to home page'
        />
      </Catcher>
      , node, () => {
      expect(node.childElementCount).toEqual(1)
      expect(node.firstChild.rel).toEqual('noopener noreferrer')
      expect(node.firstChild.dataset.abc).toEqual('def')
      expect(node.firstChild.getAttribute('aria-label')).toEqual('Link to home page')
      done()
    })
  })

  it('changes history', (done) => {
    let clickCount = 0
    const onClick = (event) => {
      clickCount += 1
    }

    render(
      <Catcher>
        <Link
          id='link'
          href='/about'
          onClick={ onClick }
        />
      </Catcher>
      , node, () => {

      expect(clickCount).toEqual(0)

      ReactTestUtils.Simulate.click($('#link'))

      setTimeout(() => {
        expect(clickCount).toEqual(1)
        expect(visitedLocations.length).toEqual(1)
        expect(visitedLocations[0].pathname).toEqual('/about')

        done()
      }, 10)

    })
  })

  it('handles external URLs', (done) => {
    let clickCount = 0
    const onClick = (event) => {
      clickCount += 1
    }

    render(
      <Catcher>
        <Link
          id='link'
          href='https://www.example.com/'
          onClick={ onClick }
        />
      </Catcher>
      , node, () => {

      expect(clickCount).toEqual(0)

      ReactTestUtils.Simulate.click($('#link'))

      setTimeout(() => {
        expect(clickCount).toEqual(1)

        done()
      }, 10)

    })
  })

})
