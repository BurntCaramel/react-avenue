import React, { Component } from 'react'
import history from './history'

const identity = (a) => a

class Avenue extends Component {
  static defaultProps = {
    pathToData: identity,
  }

  state = {
    data: this.props.pathToData(window.location.pathname),
  }

  render() {
    const { data } = this.state
    return this.props.render(data)
  }

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      this.setState({
        data: this.props.pathToData(location.pathname)
      })
    })
  }

  componentWillUnmount() {
    this.unlisten()
    delete this.unlisten
  }
}

export default Avenue
