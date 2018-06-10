import React from 'react'
import Link from 'gatsby-link'

export const pageListFragment = graphql`
query HomePageQuery{
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

class PostNavi extends React.Component {
  render() {
    const curriculum = this.props.curriculum
    const { site, data, isIndex } = this.props
    return (
      <div className="menu h-100">

        {/*
        {data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id} className="article-box">
            <h3 className="title">{node.frontmatter.title}</h3>
          </div>
        ))}
        */}
        <h2>{curriculum}  curriculum</h2>
        <ul>
          <li>
            <a href="/kubernetes/ingress">Configuring Ingress &amp; Routing </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default PostNavi
