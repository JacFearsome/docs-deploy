import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Alignment,
    Button,
    ButtonGroup,
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
    AnchorButton,
    HTMLTable,
    Dialog,
    UL,
    H3,
} from "@blueprintjs/core";

export default class RepoList extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <div>
            <HTMLTable className="repo-table" bordered={true} striped={true}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.repoList.map((repo, index) => {     
                    let button; 
                    if (this.props.loaded == repo.name) {
                        button = <Button minimal={true}>Active</Button>;
                    } else {
                        button = <Button minimal={true} onClick={() => this.props.loadFiles(repo.owner.login, repo.name)}>Load</Button>;
                    }
                    return (
                        <tr key={index}>
                            <td>
                            <AnchorButton
                                minimal={true}
                                href={repo.html_url}
                                icon="git-repo"
                                target="_blank"
                                text={repo.name}
                            /></td>
                            <td>
                                {button}
                            </td>
                        </tr>
                    )})}
                </tbody>
            </HTMLTable>
        </div>
    );
  }
}
