import React, { Component } from 'react'
import history from './history'

const identity = (a) => a

class Avenue extends Component {
  static defaultProps = {
    processPath: identity,
  }

  state = {
    path: window.location.pathname,
  }

  render() {
    const { path } = this.state
    const route = this.props.processPath(path)
    return this.props.render({ path, route, history })
  }

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      this.setState({
        path: location.pathname
      })
    })
  }

  componentWillUnmount() {
    this.unlisten()
    delete this.unlisten
  }
}

export default Avenue
