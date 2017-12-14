import expect from 'expect'

import processorForRoutes from './processorForRoutes'

describe('processorForRoutes', () => {
  it('creates a processPath() function', () => {
    const processPath = processorForRoutes([
      '/',
      '/products',
      '/products/:id',
      '/products/:id/reviews'
    ])

    expect(typeof processPath).toEqual('function')
    expect(processPath.length).toEqual(1)
  })

  it('matches on paths', () => {
    const processPath = processorForRoutes([
      '/products',
      '/products/:id',
      '/products/:id/reviews',
      '/products/:id/photos/:photoID',
    ])

    expect(processPath('/')).toEqual({
      home: true
    })

    expect(processPath('/products')).toEqual({
      products: {}
    })
    expect(processPath('/products/')).toEqual({
      products: {}
    })

    expect(processPath('/products/4')).toEqual({
      products: { id: '4' }
    })
    expect(processPath('/products/4/')).toEqual({
      products: { id: '4' }
    })

    expect(processPath('/products/4/reviews')).toEqual({
      products: {
        id: '4',
        reviews: {}
      }
    })
    expect(processPath('/products/4/reviews/')).toEqual({
      products: {
        id: '4',
        reviews: {}
      }
    })

    expect(processPath('/products/4/photos/12')).toEqual({
      products: {
        id: '4',
        photos: {
          photoID: '12'
        }
      }
    })
    expect(processPath('/products/4/photos/12/')).toEqual({
      products: {
        id: '4',
        photos: {
          photoID: '12'
        }
      }
    })

    expect(processPath('/videos')).toEqual({ notFound: true })

    expect(processPath('/products//reviews')).toEqual({ notFound: true })
    expect(processPath('/products/4/reviews/videos')).toEqual({ notFound: true })
    expect(processPath('/products/4/videos')).toEqual({ notFound: true })
  })

  it('matches on leading param', () => {
    const processPath = processorForRoutes([
      '/products',
      '/:username',
      '/:username/replies',
      '/:username/replies/:otherUser'
    ])

    expect(processPath('/')).toEqual({
      home: true
    })

    expect(processPath('/products')).toEqual({
      products: {}
    })

    expect(processPath('/anna')).toEqual({
      username: 'anna'
    })

    expect(processPath('/anna/replies')).toEqual({
      username: 'anna',
      replies: {}
    })

    expect(processPath('/anna/replies/bob')).toEqual({
      username: 'anna',
      replies: {
        otherUser: 'bob'
      }
    })
  })
})
