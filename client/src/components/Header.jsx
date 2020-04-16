// import modules
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Button,
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";

// declare header component as a class
export default class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };
  // render the header using Blueprint components.
  render() {
    // grab authentication status from property passed to the component
    const { authenticated } = this.props;
    return (
      <div>
      <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>Doc Deploy</Navbar.Heading>
              <Navbar.Divider />
              <Link to="/">
                  <Button className="bp3-minimal" icon="home" text="Home" />
              </Link>
              {authenticated ? (
                <Button onClick={this._handleLogoutClick} className="bp3-minimal" icon="log-out" text="Log Out" />
              ) : (
                <Button onClick={this._handleSignInClick} className="bp3-minimal" icon="log-in" text="Log In" />
              )}
          </Navbar.Group>
      </Navbar>
      </div>
    );
  }

  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open GitHub login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:4000/auth/github", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using GitHub passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:4000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
}
