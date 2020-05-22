import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Alignment,
    Button,
    Classes,
    Code,
    Divider,
    Tooltip,
    Position,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Icon,
    HTMLTable,
    Dialog,
    H3,
    Tree,
} from "@blueprintjs/core";

export default class TreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleNodeClick = (nodeData, nodePath, e) => {
        this.props.handleFileLoad(nodeData.id);
        this.setState(this.state);
    }

    handleNodeCollapse = (nodeData) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    }

    handleNodeExpand = (nodeData) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    }

    forEachNode = (nodes, callback) => {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }

    render() {
        return (
            <div>
                <Tree
                    contents={this.props.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
            </div>
        );
    }
}
