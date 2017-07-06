import React, { PropTypes } from 'react';
import SignUpForm from '../components/Signup.jsx';
import axios from 'axios';

class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    axios({
      method: 'post',
      url: '/auth/signup',
      data: formData,
      responseType: 'json',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },

    })
    .then((response) => {
      this.setState({
        errors: {},
      });
      localStorage.setItem('successMessage', response.message);

        // make a redirect
      this.context.router.replace('/login');
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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default SignUpPage;
