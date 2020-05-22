import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
    AnchorButton,
} from "@blueprintjs/core";
import * as constants from '../Constants';

export default class OAuth extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user: {},
        disabled: '',
        signoutUrl: ''
      }
  }

  componentDidMount() {
    this.setState({signoutUrl: `${constants.apiUrl}/signout`});
    const { socket } = this.props

    socket.on('user_data', data => {  
      //if (this.popup) this.popup.close()
      this.setState({user: data.user})
      this.props.handleData(data);
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
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${constants.apiUrl}/login`

    /*return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )*/
    return window.open(url)
  }

  startAuth = () => {
    const url = `${constants.apiUrl}/login`
    window.location.replace(url)
    /*if (!this.state.disabled) {
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }*/
  }

  render() {
    const { login } = this.state.user
    
    return (
      <div>
        {login
          ? <AnchorButton 
            href={this.state.signoutUrl}
            minimal={true}
            text="Log out"
          />
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
  socket: PropTypes.object.isRequired
}