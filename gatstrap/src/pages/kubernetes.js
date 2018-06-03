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
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="/kubernetes">Kubernetes</a>
                </li>
                <li>
                  <a href="">Microservices</a>
                </li>
                <li>
                  <a href="">Terraform</a>
                </li>
                <li>
                  <a href="">Machine Learning</a>
                </li>
                <li>
                  <a href="">Functions</a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="icons">
                <li>
                  <a href="https://twitter.com/oracleiaas">
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/oracle/cloudnative/">
                    <span className="label">GitHub</span>
                  </a>
                </li>
              </ul>
              <div className="row">
                <div className="copyright align-bottom">
                  <ul className="menu">
                    <li>
                      Copyright &copy; 2018,{' '}
                      <a href="http://oracle.com">Oracle</a> and/or its
                      affiliates. All rights reserved.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
