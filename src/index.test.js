import expect from 'expect'

import * as index from './'

describe('index', () => {
  it('exports', () => {
    expect(index.Avenue).toExist()
    expect(index.history).toExist()
    expect(index.Link).toExist()
  })
})