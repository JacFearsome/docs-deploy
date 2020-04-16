import Header from "./Header";
import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from 'axios';
import {
    Button,
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";

export default class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      githubId: PropTypes.string,
      _id: PropTypes.string
    })
  };

  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    };
    axios.get('http://localhost:4000/auth/login/success', options)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            authenticated: true,
            user: response.data.user
          });
        } else {
          throw new Error("failed to authenticate user");
        }
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
            </Navbar.Group>
        </Navbar>
      </div>
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}
