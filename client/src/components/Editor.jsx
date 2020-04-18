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
import "react-mde/lib/styles/css/react-mde-all.css";
import 'github-markdown-css/github-markdown.css';

class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            repoList: [],
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
            <div className="row">
                    <div className="column">
                        <ReactMde
                            value={this.state.file}
                            onChange={this.onChange}
                            minEditorHeight="800px"
                            generateMarkdownPreview={false}
                        />
                    </div>
                    <div className="column preview">
                        <ReactMarkdown className="markdown-body" source={this.state.file} />
                    </div>
            </div>
        </div>
        );
    }
}

export default EditorComponent;