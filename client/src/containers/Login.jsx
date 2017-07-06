import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/Login.jsx';
import axios from 'axios';

class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();


    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    axios({
      method: 'post',
      url: '/auth/login',
      data: formData,
      responseType: 'json',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },

    })
    .then((response) => {
      this.setState({
        errors: {},
      });
      Auth.authenticateUser(response.data.token);
      this.context.router.replace('/');
    }).catch((error) => {
      const errors = error.response.errors ? error.response.errors : {};
      errors.summary = error.response.message;

      this.setState({
        errors,
      });
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default LoginPage;
