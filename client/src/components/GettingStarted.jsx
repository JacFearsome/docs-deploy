import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from 'react';
import OAuth from './Oauth'
import { AnchorButton, Button, Classes, Code, Dialog, H5, Intent, Switch, Tooltip } from "@blueprintjs/core";

class GettingStarted extends React.Component {
  constructor(props) {
    super(props);
    
  }
  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  render() {
    return (
      <div>
        <Button className="bp3-minimal" icon="help" text="Getting Started" onClick={this.handleOpen} />
        <Dialog
            icon="info-sign"
            onClose={this.handleClose}
            title="Getting Started"
            {...this.state}
        >
            <div className={Classes.DIALOG_BODY}>
                <p>
                    To use this tool with your repository, you must first create a basic Docsify template inside your repository.
                </p>
                <p>Create the docs directory:</p>
                <p>
                    <Code>mkdir docs && cd docs</Code>
                </p>
                <p>Create the first few files:</p>
                <p>
                    <Code>touch README.md index.html .nojekyll</Code>
                </p>
                <p>Push the changes to GitHub:</p>
                <p>
                    <Code>git add . && git commit -am "docs support"</Code>
                </p>
                <p>
                    <Code>git push -u origin master</Code>
                </p>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button onClick={this.handleClose}>Dismiss</Button>
                    <AnchorButton
                        intent={Intent.PRIMARY}
                        href="https://docsify.js.org/#/"
                        target="_blank"
                    >
                        View Docsify Documentation
                    </AnchorButton>
                </div>
            </div>
        </Dialog>

      </div>
    );
  }
}

export default GettingStarted;