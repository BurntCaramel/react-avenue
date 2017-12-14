# react-avenue

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]


## Getting started

```
yarn add react-avenue
```

```javascript
import React from 'react'
import { Avenue } from 'react-avenue'

export default function App() {
  return (
    <Avenue render={
      (path) => (
        <p>Current path: {path}</p>
      )
    } />
}
```


[build-badge]: https://img.shields.io/travis/RoyalIcing/react-avenue/master.png?style=flat-square
[build]: https://travis-ci.org/RoyalIcing/react-avenue

[npm-badge]: https://img.shields.io/npm/v/react-avenue.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-avenue

[coveralls-badge]: https://img.shields.io/coveralls/RoyalIcing/react-avenue/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/RoyalIcing/react-avenue
