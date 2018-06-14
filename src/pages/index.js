import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import '../styles/main.scss'

import hero from '../../static/img/hero.png'

import customer_1 from '../../static/img/customers/customer_1.jpg'
import customer_2 from '../../static/img/customers/customer_2.png'
import customer_3 from '../../static/img/customers/customer_3.png'
import customer_4 from '../../static/img/customers/customer_4.png'

import topic_k8s from '../../static/img/topics/kubernetes.png'
import topic_microservices from '../../static/img/topics/microservices.png'
import topic_cloudops from '../../static/img/topics/terraform.png'
import topic_serverless from '../../static/img/topics/serverless.png'

export default function Index({ data }) {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 left">
              <h1 className="">Go Cloud-Native with Oracle</h1>
              <h3 className="subheader">
                Learn about the latest developments on building modern
                applications on top of Oracle Cloud Infrastructure
              </h3>
            </div>
            <div className="col-xl-6 right">
              <img src={hero} />
            </div>
          </div>
        </div>
      </div>
      <div className="topics">
        <div className="container cards">
          <div className="row mx-auto">
            <Link to="/kubernetes">
              <div className="card">
		<div className="card-head" id="kubernetes"><img src={topic_k8s} /></div>
                <div className="card-body">
                  <h3>Kubernetes</h3>
                </div>
              </div>
            </Link>

            <Link to="/microservices">
              <div className="card">
		<div className="card-head" id="microservices"><img src={topic_microservices} /></div>
                <div className="card-body">
                  <h3>Microservices</h3>
                </div>
              </div>
            </Link>

            <Link to="/cloudops">
              <div className="card">
		<div className="card-head" id="cloudops"><img src={topic_cloudops} /></div>
                <div className="card-body">
                  <h3>Cloud-Ops</h3>
                </div>
              </div>
            </Link>

            <Link to="/serverless">
              <div className="card">
		<div className="card-head" id="serverless"><img src={topic_serverless} /></div>
                <div className="card-body">
                  <h3>Serverless</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="customers">
      	<div className="container">
		<div className="row">
			<div className="col-xl-6">
				<h2>A Customer Casestudy</h2>
				<h3>Learn how customer achieved x with Oracle Cloudnative</h3>
				<p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta ex tellus, eu pellentesque sem eleifend at. Morbi vitae massa orci. Maecenas rhoncus felis et ligula dictum ultrices.</strong></p>
				<button type="button" class="btn btn-primary">Read More...</button>
			</div>
			<div className="col-xl-6">
				<img src="http://via.placeholder.com/600x272" />
			</div>
		</div>
	</div>
      </div>
    </div>
  )
}
