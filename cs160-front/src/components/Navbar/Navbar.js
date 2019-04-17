import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">
            Login
          </Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link mr-3" to="/myaccount">
            My Account
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-outline-danger px-3 text-white" onClick={this.props.logout}>
            Logout
          </button>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="collapse navbar-collapse container" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-brand">Notflix</li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                {' '}
                Home
              </Link>
            </li>
          </ul>
          {this.props.isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);