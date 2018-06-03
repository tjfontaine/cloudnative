import React from 'react'
import Link from 'gatsby-link'
import './style.scss'

class SiteNavi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row">
        <div className="container">
          <span className="fas fa-cloud logo" />
          <Link className="text-center" to="/">
            <h1 className="navbar-brand mb-0">Oracle Cloudnative</h1>
          </Link>
          <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        </div>
      </nav>
    )
  }
}

export default SiteNavi
