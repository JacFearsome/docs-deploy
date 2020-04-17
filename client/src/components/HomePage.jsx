import Header from "./Header";
import PropTypes from "prop-types";
import React from 'react';
import {
    Alignment,
    Button,
    Classes,
    Code,
    Divider,
    Drawer,
    Label,
    Position,
    Switch,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    FormGroup,
    InputGroup,
    HTMLTable,
    Dialog,
} from "@blueprintjs/core";

// Constants
import * as constants from '../Constants';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
        <div>
            <Header />
            
        </div>
        );
    }
}

export default HomePage;