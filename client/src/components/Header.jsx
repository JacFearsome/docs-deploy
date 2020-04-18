import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from 'react';
import {
    Button,
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Doc Deploy</Navbar.Heading>
                <Navbar.Divider />
            </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}