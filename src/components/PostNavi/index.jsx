import React from 'react'
import Link from 'gatsby-link'

import './style.scss'

class PostNavi extends React.Component {
  render() {
    const curriculum = this.props.curriculum
    const { site, data, isIndex } = this.props
    var links = []

    if (curriculum == 'Kubernetes') {
      links.push(
        <li>
          <Link to="/kubernetes/terraform-deployment">
            Installing Kubernetes on OCI with Terraform
          </Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/kubernetes/smoke-test">
            Performing a Smoke Test on a new Kubernetes Cluster
          </Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/kubernetes/services">An introduction to Services</Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/kubernetes/ingress">
            Configuring Ingress &amp; Routing{' '}
          </Link>
        </li>
      )
    } else if (curriculum == 'Microservices') {
      links.push(
        <li>
          <Link to="/microservices/">Introduction</Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/microservices/api-design">
            API Design for Microservices
          </Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/microservices/api-implementation">
            API Implementation for Microservices
          </Link>
        </li>
      )
    } else if (curriculum == 'Serverless') {
      links.push(
        <li>
          <Link to="/serverless/">Introduction</Link>
        </li>
      )
    } else if (curriculum == 'Cloudops') {
      links.push(
        <li>
          <Link to="/cloudops/">Introduction</Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/cloudops/terraform-installation">
            Installing Terraform for Oracle Cloud Infrastructure
          </Link>
        </li>
      )
      links.push(
        <li>
          <Link to="/cloudops/iam">
            Setting up Identity and Access Management on OCI using Terraform
          </Link>
        </li>
      )
    } else {
      links.push('Coming soon...')
    }

    return (
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Collapsible Group Item #1
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Collapsible Group Item #2
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div className="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Collapsible Group Item #3
              </button>
            </h5>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordion"
          >
            <div className="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostNavi
