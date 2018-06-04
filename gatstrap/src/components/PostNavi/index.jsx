import React from 'react'
import Link from 'gatsby-link'

class PostNavi extends React.Component {
  render() {
    const curriculum = this.props.curriculum
    return (
      <div>
        <h2>{curriculum} curriculum</h2>
        <ul>
          <li>
            <a href="/kubernetes/">Installing Kubernetes</a>
          </li>
          <li>
            <a href="/kubernetes/">Smoke Testing a Kubernetes Cluster</a>
          </li>
          <li>
            <a href="/kubernetes/ingress">Configuring Ingress &amp; Routing </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default PostNavi
