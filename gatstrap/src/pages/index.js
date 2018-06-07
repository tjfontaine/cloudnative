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
import topic_cloudops from '../../static/img/topics/terraform-1.png'
import topic_serverless from '../../static/img/topics/fnproject.png'

export default function Index({ data }) {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 left">
              <h1 className="">Go Cloud-Native with Oracle</h1>
              <h2 className="subheader">
                Learn about the latest developments on building modern
                applications on top of Oracle Cloud Infrastructure
              </h2>
            </div>
            <div className="col-xl-6 right">
              <img src={hero} />
            </div>
          </div>
        </div>
      </div>
      <div className="customers">
        <div className="container">
          <div className="row">
            <div className="col logos">
              <ul>
                <li>
                  <img className="img-fluid" src={customer_1} />
                </li>
                <li>
                  <img className="img-fluid" src={customer_2} />
                </li>
                <li>
                  <img className="img-fluid" src={customer_3} />
                </li>
                <li>
                  <img className="img-fluid " src={customer_4} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="topics">
        <div className="container">
          <div className="row mx-auto title">
            <h1 className="mx-auto">
              Get started with the Cloud-Native curriculum
            </h1>
          </div>
          <div className="row mx-auto">
            <a href="/kubernetes">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_k8s}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3>Kubernetes</h3>
                  <p className="card-text">
                    From beginner to advanced topics. Get started with this
                    popular container scheduling platform.
                  </p>
                </div>
              </div>
            </a>

            <a href="/microservices">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_microservices}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3>Microservices</h3>
                  <p className="card-text">
                    Start breaking up the monolith and get started with
                    microservices and the frameworks that power them.
                  </p>
                </div>
              </div>
            </a>

            <a href="/cloudops">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_cloudops}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3>Cloud-Ops</h3>
                  <p className="card-text">
                    Treat your infrastructure as code and automate the
                    provisioning of OCI using tools such as Terraform.
                  </p>
                </div>
              </div>
            </a>

            <a href="/serverless">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_serverless}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3>Serverless</h3>
                  <p className="card-text">
                    Learn everything there is to know about the next paradigm in
                    cloud-native development. and easily.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
