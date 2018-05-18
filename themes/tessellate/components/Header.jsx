import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default function Header(props) {

  return (
    <section id="header" className="dark">
      <header>
        <span class="icon major fa-cloud" style={{"font-size":"125px"}}data-reactid="4"></span>
        <h1>Welcome to Oracle <strong>Cloud Native</strong></h1>
        
        <p>A collection of tutorials and solutions on Cloud Native development on top of <a href="https://cloud.oracle.com/en_US/iaas">OCI</a></p>
      </header>
      <footer>
        <a href="#first" className="button scrolly">Curriculum Overview</a>
      </footer>
    </section>
  );
}
