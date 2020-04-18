import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { API_URL } from './config'
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

export default class OAuth extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user: {},
        disabled: ''
      }
  }

  componentDidMount() {
    const { socket } = this.props

    socket.on('github', user => {  
      this.popup.close()
      this.setState({user})
    })
    socket.on('access', token => {  
      this.props.handleAccess(token);
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup() {
    const { socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/github?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  closeCard = () => {
    this.setState({user: {}})
  }

  render() {
    const { username, url} = this.state.user
    
    return (
      <div>
        {username
          ? <h4><a href={url}>{username}</a></h4>
          : 
              <Button 
                onClick={this.startAuth} 
                minimal={true}
                text="Log in with GitHub"
              >
              </Button>
        }
      </div>
    )
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}