import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default function Footer(props) {

  return (
    <section id="footer">
      <ul className="icons">
        <li><a href="https://twitter.com/oracleiaas" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
        <li><a href="https://github.com/oracle/cloudnative/" className="icon fa-github"><span className="label">GitHub</span></a></li>
      </ul>
      <div className="copyright">
        <ul className="menu">
          <li>Copyright &copy; 2018, <a href="http://oracle.com">Oracle</a> and/or its affiliates.  All rights reserved.</li>
        </ul>
      </div>
    </section>
  );
}
