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

export default function Index({ data }) {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 left">
              <h1 className="">Go Cloud-Native with Oracle</h1>
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
              Get started with the Cloudnative curriculum
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
                  <p className="card-text">
                    Prepare a production-ready Kubernetes cluster on OCI simply,
                    and easily.
                  </p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_k8s}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    Prepare a production-ready Kubernetes cluster on OCI simply,
                    and easily.
                  </p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_k8s}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    Prepare a production-ready Kubernetes cluster on OCI simply,
                    and easily.
                  </p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_k8s}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    Prepare a production-ready Kubernetes cluster on OCI simply,
                    and easily.
                  </p>
                </div>
              </div>
            </a>

            <a href="#">
              <div className="card">
                <img
                  className="card-img-top"
                  src={topic_k8s}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    Prepare a production-ready Kubernetes cluster on OCI simply,
                    and easily.
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
