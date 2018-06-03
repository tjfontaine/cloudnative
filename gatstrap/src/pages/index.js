import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import '../styles/main.scss'

export default function Index({ data }) {
  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="col-6 left">
            <h1 className="">Oracle Cloudnative</h1>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              rutrum nibh neque, eu varius dui suscipit vel. Vestibulum pretium
              urna eget purus fermentum iaculis.
            </span>
          </div>
          <div className="col-6 right">
            <span className="fas fa-cloud" />
          </div>
        </div>
      </div>
    </div>
  )
}
