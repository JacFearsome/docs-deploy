import React from 'react';
import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
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

class MarkdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
        }
    }

    componentDidMount() {
    }

    onChange = (newValue) => {
        this.setState({ file: newValue });
    }

    render() {
        return (
        <div>
            <Header />
            <div className="sidenav">
                <div className="sidenav-1">
                    <RepoList />
                </div>
                <div className="sidenav-2">
                    <TreeView />
                </div>
            </div>
        </div>
        );
    }
}

export default MarkdownPage;