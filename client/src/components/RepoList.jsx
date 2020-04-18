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

        this.state = {
            list: [
                {
                    name: "doc-deploy",
                    url: "https://github.com/JacFearsome/doc-deploy"
                },
                {
                    name: "jrussell-md",
                    url: "https://github.com/JacFearsome/jrussell-md"
                }
            ]
        }
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
                {this.state.list.map((repo, index) => (
                    <tr index={index}>
                        <td>
                        <AnchorButton
                            minimal={true}
                            href={repo.url}
                            rightIcon="share"
                            target="_blank"
                            text={repo.name}
                        /></td>
                        <td>
                            <ButtonGroup minimal={true}>
                                <Button>Load</Button>
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
