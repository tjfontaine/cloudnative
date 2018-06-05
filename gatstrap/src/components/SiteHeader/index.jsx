import React from 'react'
import Link from 'gatsby-link'
import './style.scss'

class SiteHeader extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row">
        <div className="container">
          <Link className="text-center" to="/">
            <img className="oracle" src="img/oracle_logo.png" />
          </Link>
          <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        </div>
      </nav>
    )
  }
}

export default SiteHeader
