import React from 'react'
import Link from 'gatsby-link'

import './style.scss'
import bullet from '../../../static/img/post_bullet.png'

class PostNavi extends React.Component {
  render() {
    const currentCurr = this.props.data.frontmatter.curriculum
    const currentPath = this.props.data.frontmatter.path
    const posts = {
      Kubernetes: {
        _: 'Introduction',
        'terraform-deployment': 'Installing Kubernetes on OCI with Terraform',
        'smoke-test': 'Performing a Smoke Test on a new Kubernetes Cluster',
        services: 'An Introduction to Services',
        ingress: 'Configuring Ingress & Routing',
      },
      Microservices: {
        _: 'Introduction',
        'api-design': 'API Design for Microservices',
        'api-implementation': 'API Implementation for Microservices',
      },
      Serverless: {
        _: 'Introduction',
      },
      Cloudops: {
        _: 'Introduction',
        'terraform-installation': 'Installing Terraform for OCI',
        iam: 'Setting up Identity and Access Management on OCI using Terraform',
      },
    }

    const makeList = (curr, linksObj) => {
      let links = []

      for (var link in linksObj) {
        var slug = link == '_' ? '' : '/' + link
        let url = '/' + curr.toLowerCase() + slug
        let state = url == currentPath ? 'active' : 'inactive'

        links.push(
          <li>
            <Link className={state} to={url}>
              {linksObj[link]}
            </Link>
          </li>
        )
      }

      return links
    }

    const makeMenuItem = (curr, links) => {
      let state = currentCurr == curr ? 'show' : ''

      return (
        <div className="card">
          <div
            className="card-header"
            id={'heading' + curr}
            style={{ backgroundImage: 'url(' + bullet + ')' }}
          >
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target={'#collapse' + curr}
                aria-expanded="true"
                aria-controls={'collapse' + curr}
              >
                {curr}
              </button>
            </h5>
          </div>
          <div
            id={'collapse' + curr}
            className={'collapse' + state}
            aria-labelledby={'heading' + curr}
            data-parent="#accordion"
          >
            <div className="card-body">
              <ul>{links}</ul>
            </div>
          </div>
        </div>
      )
    }

    let menu = []

    for (let curr in posts) {
      let links = makeList(curr, posts[curr])
      let menuItem = makeMenuItem(curr, links)
      menu.push(menuItem)
    }

    return (
      <div id="accordion" className="menu">
        {menu}
      </div>
    )
  }
}

export default PostNavi
