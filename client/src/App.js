import React from 'react';
import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown';
import ReactMde from "react-mde";
import brace from 'brace';
import AceEditor from 'react-ace';
import io from 'socket.io-client'
import axios from "axios";
import {
    AnchorButton,
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
    ButtonGroup,
    Intent,
    Alert,
    Icon,
    Tooltip,
    Text,
} from "@blueprintjs/core";
import RepoList from "./components/RepoList";
import TreeView from "./components/TreeView";
import OAuth from './components/Oauth'
import { AppToaster } from "./components/Toast";
import GettingStarted from "./components/GettingStarted";
import "react-mde/lib/styles/css/react-mde-all.css";
import 'github-markdown-css/github-markdown.css';
import 'brace/mode/html';
import 'brace/theme/github';
import * as constants from './Constants';

const socket = io(constants.apiUrl);

const timer = setTimeout(() => {
  console.log('waiting...')
}, 3000);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            accessToken: "",
            repoList: [],
            nodes: [],
            owner: "",
            repo: "",
            file: "",
            indexFile: "",
            mode: "html",
            currPath: "",
            pages: {},
            isConfirmOpen: false,
            mode: "write",
            editDisabled: true,
        }
        //this.loadIndex = this.loadIndex.bind(this);
    }

    componentDidMount() {

    }

    onLoad = (editor) => {
    }
    handleMoveOpen = () => this.setState({ isConfirmOpen: true });
    handleMoveCancel = () => this.setState({ isConfirmOpen: false });
  
    onIndexChange = (newValue) => {
      this.setState({ indexFile: newValue });
    }

    showMessage = (msg) => {
      let notification = AppToaster.show({ message: msg });
      setTimeout(() => {
        AppToaster.dismiss(notification);
      }, 3000);
    }

    onChange = (newValue) => {
        this.setState({ file: newValue });
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
        this.loadIndex()
    };
  
    handleClose = (event) => {
        this.setState({ isOpen: false, filename: "", sha: "", filepath: "" });
    };

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    handleData = (data) => {
        this.setState({ accessToken: data.access_token, user: data.user, owner: data.user.login });
        constants.instance.get(`/user/repos`, {
            headers: {
                "Authorization": `token ${this.state.accessToken}`,
                "Content-Type": "application/json"
            }})
          .then(res => {
            this.setState({ repoList: res.data });
            this.showMessage(`Logged in as ${data.user.login}`)
          })
    }
    loadDocs = (owner, repo) => {
      this.setState({file: "", indexFile: "", repo: "", sha: "", filename: "", filepath: ""})
      let nodes = [];
      constants.instance.get(`/repos/${owner}/${repo}/contents/docs`, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          this.showMessage(`Loaded repository: ${repo}`)
          for (let i in res.data) {
            let item = res.data[i];
            if (item.type === "file") {
              let nodeObj = {
                  id: item.path,
                  hasCaret: false,
                  icon: "document",
                  label: item.name,
              }
              nodes.push(nodeObj);
            } else if (item.type === "dir") {
              let nodeObj = {
                  id: item.path,
                  hasCaret: true,
                  icon: "folder-open",
                  label: item.name,
                  childNodes: this.travelFolder(owner, repo, item.path)
              }
              nodes.push(nodeObj);
            }
          }
          this.setState({nodes: nodes, owner: owner, repo: repo})
          this.componentDidMount()
        }).catch(err => {
          this.showMessage(`No docs folder found. Please look at Getting Started.`);
        });
    }
    travelFolder = (owner, repo, path) => {
      let nodes = [];
      constants.instance.get(`/repos/${owner}/${repo}/contents/${path}`, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          for (let i in res.data) {
            let item = res.data[i];
            if (item.type === "file") {
              if (item.name.indexOf(".md") !== -1) {
                let nodeObj = {
                    id: item.path,
                    hasCaret: false,
                    icon: "document",
                    label: item.name,
                }
                nodes.push(nodeObj);
              }
            } else if (item.type === "dir") {
              let nodeObj = {
                  id: item.path,
                  hasCaret: true,
                  icon: "folder-open",
                  label: item.name,
                  childNodes: this.travelFolder(owner, repo, item.path)
              }
              nodes.push(nodeObj);
            }
          }
        })
        return nodes;
    }
    loadFile = (path) => {
      this.setState({currPath: path});
      this.handleMoveOpen()
    }
    execFileLoad = () => {
      let path = this.state.currPath;
      this.setState({isConfirmOpen: false});
      constants.instance.get(`/repos/${this.state.owner}/${this.state.repo}/contents/${path}`, {
        headers: {
            "Authorization": `token ${this.state.accessToken}`,
            "Content-Type": "application/json"
        }})
      .then(res => {
        axios.get(res.data.download_url).then((response) => {
          if (res.data.name == "index.html") {
            this.handleOpen();
            this.setState({indexFile: response.data, sha: res.data.sha, filename: res.data.name, filepath: path});
          } else {
            this.showMessage(`Loaded file: ${res.data.name}`);
            this.setState({file: response.data, sha: res.data.sha, filename: res.data.name, filepath: path,});
          }
        });
      })
    }
    saveFile = () => {
      this.setState({editDisabled: true});
      constants.instance.put(`/repos/${this.state.owner}/${this.state.repo}/contents/${this.state.filepath}`, 
          {
            "name": this.state.filepath,
            "message": this.state.filepath,
            "committer": {
              "name": this.state.user.name,
              "email": this.state.user.email
            },
            "content": new Buffer(this.state.file).toString('base64'),
            "sha": this.state.sha
          }, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          this.showMessage(`Saved file: ${this.state.filepath}`)
          //this.loadDocs(this.state.owner, this.state.repo);
        })
    }
    newFile = (path) => {
      constants.instance.put(`/repos/${this.state.owner}/${this.state.repo}/contents/${this.state.filepath}`, 
          {
            "name": this.state.filepath,
            "message": this.state.filepath,
            "committer": {
              "name": this.state.user.name,
              "email": this.state.user.email
            },
            "content": new Buffer(this.state.file).toString('base64'),
            "sha": this.state.sha
          }, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          this.showMessage(`Saved file: ${this.state.filepath}`)
        })
    }
    deleteFile = () => {
      constants.instance.delete(`/repos/${this.state.owner}/${this.state.repo}/contents/${this.state.filepath}`, 
          {
            "message": this.state.filepath,
            "sha": this.state.sha
          }, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          this.showMessage(`Deleted file: ${this.state.filepath}`)
        }).catch((err) => {
          this.showMessage(`Error deleting ${this.state.filepath}`)
        })
    }
    loadIndex = () => {
      constants.instance.get(`/repos/${this.state.owner}/${this.state.repo}/contents/docs/index.html`, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          axios.get(res.data.download_url).then((response) => {
            this.setState({indexFile: response.data, indexSha: res.data.sha, indexFilepath: '/docs/index.html'});
          });
        })
    }
    saveIndexFile = () => {
      constants.instance.put(`/repos/${this.state.owner}/${this.state.repo}/contents/docs/index.html`, 
          {
            "name": this.state.indexFilepath,
            "message": this.state.indexFilepath,
            "committer": {
              "name": this.state.user.name,
              "email": this.state.user.email
            },
            "content": new Buffer(this.state.indexFile).toString('base64'),
            "sha": this.state.indexSha
          }, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          this.showMessage(`Saved index.html`)
        })
    }
    loadDefaultIndex = () => {
      this.setState({indexFile: constants.defaultIndex})
    }
    viewGH = () => {
      constants.instance.get(`/repos/${this.state.owner}/${this.state.repo}/pages`, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          window.open(res.data.html_url, "_blank")
        })
    }
    buildGH = () => {
      constants.instance.post(`/repos/${this.state.owner}/${this.state.repo}/pages/builds`, {}, {
          headers: {
              "Authorization": `token ${this.state.accessToken}`,
              "Content-Type": "application/json"
          }})
        .then(res => {
          this.showMessage(`Built GitHub Pages`)
        }).catch((err) => {
          this.showMessage(`Error building GitHub Pages`)
          
        })
    }
    enableGH = () => {
      constants.instance.get(`/repos/${this.state.owner}/${this.state.repo}/pages`, {
          headers: {
            "Authorization": `token ${this.state.accessToken}`,
            "Content-Type": "application/json"
          }})
        .then(res => {
          if (res.data) {
            this.showMessage(`GitHub pages is already enabled for ${this.state.repo}`)
          }
        }).catch(err => {
          this.showMessage(`GitHub pages not found for ${this.state.repo}, creating...`)
          constants.instance.post(`/repos/${this.state.owner}/${this.state.repo}/pages`, {
                "source": {
                    "branch": "master",
                    "path": "/docs"
              }
            }, {
              headers: {
                "Authorization": `token ${this.state.accessToken}`,
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.switcheroo-preview+json"
              }})
            .then(ress => {
              this.showMessage(`GitHub pages is now enabled for ${this.state.repo}`)
            })
        })
    }

    editPath = () => {
      if (this.state.editDisabled == true) {
        this.setState({editDisabled: false});
      } else {
        this.setState({editDisabled: true});
      }
    }

    render() {
        return (
        <div>
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Docsify Deploy</Navbar.Heading>
                    <Navbar.Divider />
                    <GettingStarted />
                    <Button className="bp3-minimal" icon="cog" text="Config" onClick={this.handleOpen} />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}><h4>
                  <a href={this.state.user.html_url} target="_blank">{this.state.user.login}</a></h4>
                  <Divider />
                  <OAuth socket={socket} handleData={this.handleData}/>
                </Navbar.Group>
            </Navbar>
            <div className="sidenav">
                <div className="sidenav-1">
                    <RepoList loadFiles={this.loadDocs} loaded={this.state.repo} repoList={this.state.repoList} />
                </div>
                <div className="sidenav-2">
                <TreeView handleFileLoad={this.loadFile} nodes={this.state.nodes} />
                </div>
            </div>
            <div className="row">
                    <div className="column">
                        <ButtonGroup minimal={true}>
                            <InputGroup id="text-input" placeholder="docs/" onChange={this.handleChange("filepath")} value={this.state.filepath} disabled={this.state.editDisabled}/>
                            <Button icon="edit" onClick={this.editPath}></Button>
                            <Button icon="floppy-disk" onClick={this.saveFile}></Button>
                            <Button icon="trash" onClick={this.deleteFile}></Button>
                        </ButtonGroup>
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
            <Drawer
                icon="cog"
                onClose={this.handleClose}
                title="Docsify Config"
                isOpen={this.state.isOpen}
            >
                <div className={Classes.DRAWER_BODY}>
                    <div className={Classes.DIALOG_BODY}>
                        <ButtonGroup minimal={true}>
                          <Tooltip content="Save index file" position={Position.RIGHT}>
                            <Button icon="floppy-disk" onClick={this.saveIndexFile}></Button>
                          </Tooltip>
                          <Tooltip content="Build GitHub Pages" position={Position.RIGHT}>
                            <Button icon="build" onClick={this.buildGH}></Button>
                          </Tooltip>
                          <Tooltip content="Enable GitHub Pages" position={Position.RIGHT}>
                            <Button icon="page-layout" onClick={this.enableGH}></Button>
                          </Tooltip>
                          <Tooltip content="View GitHub Pages" position={Position.RIGHT}>
                            <Button icon="globe-network" onClick={this.viewGH}></Button>
                          </Tooltip>
                          <Tooltip content="Generate index file" position={Position.RIGHT}>
                            <Button icon="insert" onClick={this.loadDefaultIndex}></Button>
                          </Tooltip>
                          <Divider />
                          <AnchorButton
                                href="https://docsify.js.org/#/quickstart"
                                target="_blank"
                                text="Quick Start"
                            />
                          <AnchorButton
                                href="https://docsify.js.org/#/configuration"
                                target="_blank"
                                text="Configuration"
                            />
                          <AnchorButton
                                href="https://docsify.js.org/#/themes"
                                target="_blank"
                                text="Themes"
                            />
                          <AnchorButton
                                href="https://docsify.js.org/#/plugins"
                                target="_blank"
                                text="Plugins"
                            />
                          <AnchorButton
                                href="https://github.com/docsifyjs/awesome-docsify"
                                target="_blank"
                                text="Awesome Docsify"
                            />
                        </ButtonGroup>
                        <AceEditor
                        className="editor"
                        height="800px"
                        width="850px"
                        mode={this.state.mode}
                        theme="github"
                        onChange={this.onIndexChange}
                        name="editor"
                        editorProps={{$blockScrolling: true}}
                        onLoad={this.onLoad}
                        fontSize={13}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={false}
                        value={this.state.indexFile}
                        setOptions={{
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        />
                    </div>
                </div>
                <div className={Classes.DRAWER_FOOTER}></div>
            </Drawer>
            <Alert
                    cancelButtonText="Cancel"
                    confirmButtonText="Switch"
                    icon="exchange"
                    intent={Intent.DANGER}
                    isOpen={this.state.isConfirmOpen}
                    onCancel={this.handleMoveCancel}
                    onConfirm={this.execFileLoad}
                >
                <p>
                    Are you sure you want to switch files?
                </p>
                </Alert>
        </div>
        );
    }
}

export default App;