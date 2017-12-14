import expect from 'expect'

import fromPaths from './fromPaths'

describe('fromPaths', () => {
  it('creates a pathToData() function', () => {
    const pathToData = fromPaths([
      '/',
      '/products',
      '/products/:productID',
      '/products/:productID/reviews'
    ])

    expect(typeof pathToData).toEqual('function')
    expect(pathToData.length).toEqual(1)
  })

  it('matches on paths', () => {
    const pathToData = fromPaths([
      '/',
      '/products',
      '/products/:id',
      '/products/:id/reviews',
    ])

    expect(pathToData('/')).toEqual({
      home: true
    })

    expect(pathToData('/products')).toEqual({
      products: {}
    })
    expect(pathToData('/products/')).toEqual({
      products: {}
    })

    expect(pathToData('/products/4')).toEqual({
      products: { id: '4' }
    })
    expect(pathToData('/products/4/')).toEqual({
      products: { id: '4' }
    })

    expect(pathToData('/products/4/reviews')).toEqual({
      products: {
        id: '4',
        reviews: {}
      }
    })

    expect(pathToData('/products/4/reviews/')).toEqual({
      products: {
        id: '4',
        reviews: {}
      }
    })

    expect(pathToData('/videos')).toEqual({ notFound: true })

    expect(pathToData('/products//reviews')).toEqual({ notFound: true })
    expect(pathToData('/products/4/reviews/videos')).toEqual({ notFound: true })
    expect(pathToData('/products/4/videos')).toEqual({ notFound: true })
  })

  it('matches on leading param', () => {
    const pathToData = fromPaths([
      '/',
      '/products',
      '/:username',
      '/:username/replies',
      '/:username/replies/:otherUser'
    ])

    expect(pathToData('/')).toEqual({
      home: true
    })

    expect(pathToData('/products')).toEqual({
      products: {}
    })

    expect(pathToData('/anna')).toEqual({
      username: 'anna'
    })

    expect(pathToData('/anna/replies')).toEqual({
      username: 'anna',
      replies: {}
    })

    expect(pathToData('/anna/replies/bob')).toEqual({
      username: 'anna',
      replies: {
        otherUser: 'bob'
      }
    })
  })
})
