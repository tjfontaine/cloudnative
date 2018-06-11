import React from 'react'
import Link from 'gatsby-link'
import { siteMetadata } from '../../gatsby-config'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import emergence from 'emergence.js'

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
      </div>
    )
  }
}

export default Template
