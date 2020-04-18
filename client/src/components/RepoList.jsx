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
                    <th>Name</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                {this.props.repoList.map((repo, index) => (
                    <tr key={index}>
                        <td>
                        <AnchorButton
                            minimal={true}
                            href={repo.html_url}
                            rightIcon="share"
                            target="_blank"
                            text={repo.name}
                        /></td>
                        <td>
                            <ButtonGroup minimal={true}>
                                <Button>Load</Button>
                                <Button>Deploy</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </HTMLTable>
        </div>
    );
  }
}
