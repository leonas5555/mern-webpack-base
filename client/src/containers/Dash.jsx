import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dash.jsx';
import axios from 'axios';

class DashboardPage extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/dashboard',
      responseType: 'json',
      headers: { Authorization: `bearer ${Auth.getToken()}` },

    })
    .then((response) => {
      this.setState({
        secretData: response.data.message,
      });
    });
  }


  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;
