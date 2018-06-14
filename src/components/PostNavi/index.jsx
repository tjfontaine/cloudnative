import React from 'react'
import Link from 'gatsby-link'

class PostNavi extends React.Component {
  render() {
    const curriculum = this.props.curriculum
    const { site, data, isIndex } = this.props
    var links = [];

    if (curriculum == "Kubernetes") {
      links.push(<li><Link to="/kubernetes/terraform-deployment">Installing Kubernetes on OCI with Terraform</Link></li>);
      links.push(<li><Link to="/kubernetes/smoke-test">Performing a Smoke Test on a new Kubernetes Cluster</Link></li>);
      links.push(<li><Link to="/kubernetes/services">An introduction to Services</Link></li>);
      links.push(<li><Link to="/kubernetes/ingress">Configuring Ingress &amp; Routing </Link></li>);
    } else if (curriculum == "Microservices") {
      links.push(<li><Link to="/microservices/">Introduction</Link></li>);
      links.push(<li><Link to="/microservices/api-design">API Design for Microservices</Link></li>);
      links.push(<li><Link to="/microservices/api-implementation">API Implementation for Microservices</Link></li>);
    } else if (curriculum == "Serverless") {
      links.push(<li><Link to="/serverless/">Introduction</Link></li>);
    } else if (curriculum == "Cloudops") {
      links.push(<li><Link to="/cloudops/">Introduction</Link></li>);
      links.push(<li><Link to="/cloudops/terraform-installation">Installing Terraform for Oracle Cloud Infrastructure</Link></li>);
      links.push(<li><Link to="/cloudops/iam">Setting up Identity and Access Management on OCI using Terraform</Link></li>);
    } else {
      links.push('Coming soon...');
    }

    return (
      <div className="menu h-100">
      <ul>
	    {links}
      </ul>

        {/*
        {data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id} className="article-box">
            <h3 className="title">{node.frontmatter.title}</h3>
          </div>
        ))}
        */}
      </div>
    )
  }
}

export default PostNavi
