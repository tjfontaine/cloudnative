import React from 'react'
import Link from 'gatsby-link'

class SiteFooter extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
			<div className="col-xl text-center">
				<hr />
				<p><strong>Copyright © 2018, Oracle and/or its affiliates. All rights reserved. Oracle and Java are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.</strong></p>
				<p></p>
			</div>
          </div>
        </div>
      </div>
    )
  }
}

export default SiteFooter
