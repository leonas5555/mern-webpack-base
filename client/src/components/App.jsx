import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import Auth from '../modules/Auth';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOptionsButtonClick = this.handleOptionsButtonClick.bind(this);
    // this.handleClose = this.handleClose.bind(this);
  }

  handleOptionsButtonClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onTouchTap={this.handleOptionsButtonClick}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleOptionsButtonClick}>Menu Item 2</MenuItem>
        </Drawer>
        <AppBar
          title="App"
          onLeftIconButtonTouchTap={this.handleOptionsButtonClick}
          iconElementRight={<LoginButton />}
        />

        {this.props.children}

      </div>
    );
  }
}
const LoginButton = () => (
  <div>


    {Auth.isUserAuthenticated() ? (
      <FlatButton
        containerElement={<Link to="/logout" />}
        label="Sign out"
      />

  ) : (

    <FlatButton
      containerElement={<Link to="/login" />}
      label="Sign in"
    />
  )}

  </div>
);
App.propTypes = {
  children: PropTypes.object.isRequired,
};
