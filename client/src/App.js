import React, { Component } from "react";
import io from 'socket.io-client'
import EditorComponent from "./components/Editor";
import RepoList from "./components/RepoList";
import TreeView from "./components/TreeView";
import { API_URL } from './config'
import OAuth from './Oauth'
import {
    Button,
    Alignment,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";
import * as constants from './Constants';

const socket = io(API_URL)
const providers = ['github']

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: true,
        user: {},
        accessToken: "",
        repoList: []
      }
  }x

  componentDidMount() {
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          this.setState({ loading: false })  
        }
    })
  }
  performTasks = (token) => {
    this.setState({accessToken: token})
  }
  fetchRepo = () => {
    constants.instance.get(`/user/repos`, {
        headers: {
            Authorization: `token ${this.state.accessToken}`,
            "Content-Type": "application/json"
        }})
      .then(res => {
        console.log(res.data);
        this.setState({ repoList: res.data });
        this.componentDidMount()
      })
  }

  render() {
    
    return (
      <div className='wrapper'>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Doc Deploy</Navbar.Heading>
                <Navbar.Divider />
                <Button minimal={true} onClick={this.fetchRepo} text="Load Repositories" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <OAuth key="github" socket={socket} handleAccess={this.performTasks} />
            </Navbar.Group>
        </Navbar>
        <div className="sidenav">
            <div className="sidenav-1">
                <RepoList repoList={this.state.repoList} />
            </div>
            <div className="sidenav-2">
                <TreeView />
            </div>
        </div>
        <EditorComponent />
      </div>
    )
  }
}

export default App;
