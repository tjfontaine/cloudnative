import React from 'react'
import Link from 'gatsby-link'
import './style.scss'

import logo from '../../../static/img/oracle_logo.png';

class SiteHeader extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar navbar-expand ">
        <div className="container">
            <div className="col-6 logo text-center"><a href="/"><img src={logo} /></a></div>
        </div>
      </nav>
    )
  }
}

export default SiteHeader
