import pathToRegexp from 'path-to-regexp'

function processorForRoutes(paths) {
  const routes = paths.reduce((routes, path) => {
    let keys = []
    const re = pathToRegexp(path, keys)
    const tokens = pathToRegexp.parse(path)
    routes.push({
      re,
      keys,
      tokens
    })
    return routes
  }, [])

  return (path) => {
    if (path === '/') {
      return { home: true }
    }

    let nestedData = {}
    let data = nestedData
    
    const found = routes.some((route) => {
      const result = route.re.exec(path)
      if (result == null) {
        return false
      }

      let keyIndex = 0
      route.tokens.forEach((token) => {
        if (typeof token === 'string') {
          let component = token
          if (component[0] === '/') {
            // Remove leading slash
            component = component.slice(1)
          }

          let componentData = {}
          nestedData[component] = componentData
          nestedData = componentData
        }
        else {
          const key = token.name
          const value = result[keyIndex + 1]
          nestedData[key] = value
          keyIndex += 1
        }
      })

      return true
    })

    if (found) {
      return data
    }
    else {
      return { notFound: true }
    }
  }
}

export default processorForRoutes