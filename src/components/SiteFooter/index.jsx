import React from 'react'
import Link from 'gatsby-link'

class SiteFooter extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="/kubernetes">Kubernetes</a>
                </li>
                <li>
                  <a href="">Microservices</a>
                </li>
                <li>
                  <a href="">Terraform</a>
                </li>
                <li>
                  <a href="">Machine Learning</a>
                </li>
                <li>
                  <a href="">Functions</a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="icons">
                <li>
                  <a href="https://twitter.com/oracleiaas">
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/oracle/cloudnative/">
                    <span className="label">GitHub</span>
                  </a>
                </li>
              </ul>
              <div className="row">
                <div className="copyright align-bottom">
                  <ul className="menu">
                    <li>
                      Copyright &copy; 2018,{' '}
                      <a href="http://oracle.com">Oracle</a> and/or its
                      affiliates. All rights reserved.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SiteFooter
