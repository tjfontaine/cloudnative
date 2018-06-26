import get from 'lodash/get'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import React from 'react'

import SitePost from '../components/SitePost'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this, 'props.data.post')
    const site = get(this, 'props.data.site')
    const layout = get(post, 'frontmatter.layout')
    const title = get(post, 'frontmatter.title')
    const siteTitle = get(site, 'meta.title')

    let template = <SitePost data={post} site={site} isIndex={false} />
    return (
      <div>
        <Helmet
          title={`${title} | ${siteTitle}`}
          meta={[
            { property: 'og:title', content: get(post, 'frontmatter.title') },
            {
              property: 'og:curriculum',
              content: get(post, 'frontmatter.curriculum'),
            },
            {
              property: 'og:url',
              content: get(site, 'meta.url') + get(post, 'frontmatter.path'),
            },
          ]}
        />
        {template}
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      meta: siteMetadata {
        title
        description
        url: siteUrl
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        curriculum
        path
        date(formatString: "YYYY/MM/DD")
      }
    }
	allPosts: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
		totalCount
			edges {
				node {
					frontmatter {
						title
						date
						curriculum
					  }
					  excerpt
					  timeToRead
				}
			}
	  }
  }
`
