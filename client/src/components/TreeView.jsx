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
            nodes: [
                {
                    id: 0,
                    hasCaret: true,
                    icon: "folder-close",
                    label: "Folder 0",
                },
                {
                    id: 1,
                    icon: "folder-close",
                    isExpanded: true,
                    label: (
                        <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
                            Folder 1
                        </Tooltip>
                    ),
                    childNodes: [
                        {
                            id: 2,
                            icon: "document",
                            label: "Item 0",
                            secondaryLabel: (
                                <Tooltip content="An eye!">
                                    <Icon icon="eye-open" />
                                </Tooltip>
                            ),
                        },
                        {
                            id: 3,
                            icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
                            label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
                        },
                        {
                            id: 4,
                            hasCaret: true,
                            icon: "folder-close",
                            label: (
                                <Tooltip content="foo" position={Position.RIGHT}>
                                    Folder 2
                                </Tooltip>
                            ),
                            childNodes: [
                                { id: 5, label: "No-Icon Item" },
                                { id: 6, icon: "tag", label: "Item 1" },
                                {
                                    id: 7,
                                    hasCaret: true,
                                    icon: "folder-close",
                                    label: "Folder 3",
                                    childNodes: [
                                        { id: 8, icon: "document", label: "Item 0" },
                                        { id: 9, icon: "tag", label: "Item 1" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    hasCaret: true,
                    icon: "folder-close",
                    label: "Super secret files",
                    disabled: true,
                },
            ]
        }
    }

    handleNodeClick = (nodeData, notePath, e) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
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
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
            </div>
        );
    }
}
