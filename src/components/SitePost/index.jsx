import React from 'react'
import Link from 'gatsby-link'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import size from 'lodash/size'

import './style.scss'

import PostNavi from '../PostNavi'
import post_hero from '../../../static/img/post_hero.png'

class SitePost extends React.Component {
  render() {
    const { site, data, isIndex } = this.props
    const title = get(data, 'frontmatter.title')
    const curriculum = get(data, 'frontmatter.curriculum')
    const path = get(data, 'frontmatter.path')
    const date = get(data, 'frontmatter.date')
    const html = get(data, 'html')

    return (
      <div className="content">
        <div
          className="post-hero text-center"
          style={{ backgroundImage: 'url(' + post_hero + ')' }}
        >
          <h1>{title}</h1>
        </div>
        <div className="container h-100">
          <div className="row">
            <div className="col-xl-4">
              <PostNavi curriculum={curriculum} />
            </div>
            <div className="col-xl-8 post-container">
              <div className="post">
                <div
                  className="page-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SitePost
