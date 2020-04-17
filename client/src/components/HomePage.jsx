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
    H3,
} from "@blueprintjs/core";
import Header from "./Header";
import RepoList from "./RepoList";
import TreeView from "./TreeView";

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
            <div className="sidenav-1">
                <RepoList />
            </div>
            <div className="sidenav-2">
                <TreeView />
            </div>
        </div>
        );
    }
}

export default HomePage;