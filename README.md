# react-avenue

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]


## Getting started

```
npm i -S react-avenue
# or yarn:
yarn add react-avenue
```

### Basic

```javascript
import React from 'react'
import { Avenue } from 'react-avenue'

export default function App() {
  return (
    <Avenue render={
      ({ path }) => (
        <p>Current path: {path}</p>
      )
    } />
}
```

### Route params

```javascript
import React from 'react'
import { Avenue } from 'react-avenue'
import processorForRoutes from 'react-avenue/es/processorForRoutes'
import LandingPage from './components/LandingPage'
import Product from './components/Product'
import ProductsList from './components/ProductsList'
import ContactPage from './components/ContactPage'

const processPath = processorForRoutes([
  '/products',
  '/products/:id',
  '/products/:id/reviews',
  '/contact',
])

export default function App() {
  return (
    <Avenue processPath={processPath} render={
      ({ route, path }) => <main>
        {
          route.home ? (
            <LandingPage />
          ) : route.products ? (
            route.products.id ? (
              <Product
                id={ route.products.id }
                activeSection={ route.products.reviews ? 'reviews' : 'overview' }
              />
            ) : (
              <ProductsList />
            )
          ) : route.contact ? (
            <ContactPage />
          ) : (
            <p>Page not found: {path}</p>
          )
        )
      }
      </main>
    } />
}
```


[build-badge]: https://img.shields.io/travis/RoyalIcing/react-avenue/master.png?style=flat-square
[build]: https://travis-ci.org/RoyalIcing/react-avenue

[npm-badge]: https://img.shields.io/npm/v/react-avenue.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-avenue

[coveralls-badge]: https://img.shields.io/coveralls/RoyalIcing/react-avenue/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/RoyalIcing/react-avenue
