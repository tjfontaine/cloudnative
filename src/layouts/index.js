import React from 'react'
import Link from 'gatsby-link'
import { siteMetadata } from '../../gatsby-config'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import emergence from 'emergence.js'
import 'bootstrap/dist/js/bootstrap'
import './gatstrap.scss'
import 'animate.css/animate.css'
import 'prismjs/themes/prism-okaidia.css'
import 'devicon-2.2/devicon.min.css'
import 'font-awesome/css/font-awesome.css'

class Template extends React.Component {
  componentDidMount() {
    emergence.init()
  }

  componentDidUpdate() {
    emergence.init()
  }

  render() {
    const { location, children } = this.props
    return (
      <div>
        <SiteHeader {...this.props} />
        {children()}
        <SiteFooter />
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        />
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        />
      </div>
    )
  }
}

export default Template
