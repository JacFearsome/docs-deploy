import React from 'react';
import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import brace from 'brace';
import AceEditor from 'react-ace';
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
import 'brace/mode/html';
import 'brace/theme/github';

class ConfigPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            mode: "html",
        }
    }

    componentDidMount() {
    }

    onLoad(editor) {
      console.log("Ace editor loaded...");
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
                    <Button className="action-button">Generate Docsify</Button>
                    <Button className="action-button">Preview Docsify</Button>
                    <Button className="action-button">Deploy Docsify</Button>
                </div>
            </div>
            <AceEditor
            className="editor"
            height="1000px"
            width="1000px"
            mode={this.state.mode}
            theme="github"
            onChange={this.onChange}
            name="editor"
            editorProps={{$blockScrolling: true}}
            onLoad={this.onLoad}
            fontSize={13}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={false}
            value={this.state.file}
            setOptions={{
                showLineNumbers: true,
                tabSize: 2,
            }}
            />
        </div>
        );
    }
}

export default ConfigPage;