import React from 'react'
import Link from 'gatsby-link'

/*
export const pageListFragment = graphql`
query HomePageQuery{
fragment 
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    totalCount
    edges {
      node {
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`
*/
class PostNavi extends React.Component {
  render() {
    const curriculum = this.props.curriculum
    const { site, data, isIndex } = this.props
    console.log(this.props);

    var links = "";

    if (curriculum == "Kubernetes") {
      links += '<li><a href="/kubernetes/ingress">Configuring Ingress &amp; Routing </a></li>';
    } else if (curriculum == "Microservices") {
      links += '<li><a href="/microservices/">Introduction</a></li>';
      links += '<li><a href="/microservices/api-design">API Design for Microservices</a></li>';
      links += '<li><a href="/microservices/api-implementation">API Implementation for Microservices</a></li>';
    } else {
      links += 'Coming soon...';
    }

    return (
      <div className="menu h-100">
      <h2>{curriculum}  curriculum</h2>
      <ul dangerouslySetInnerHTML={{__html: links}}>
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
