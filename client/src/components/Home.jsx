import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import axios from 'axios';
import ListItem from '../components/ListItem.jsx';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      trainzData: '',
      nowDate: new Date(),
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://rata.digitraffic.fi/api/v1/live-trains?station=SLO',
      responseType: 'json',
    })
    .then((response) => {
      this.setState({
        trainzData: response.data,
      });
    });
  }


  render() {
    return (

      <Card className="container">
        <div>{this.state.nowDate.toString()}</div>
        <CardTitle title="Trainz" subtitle="Trainz home page." />
        <TrainzList props={this.state.trainzData} />
      </Card>


    );
  }

}

const TrainzList = ({ props }) => {
  const listItems = Object.keys(props).map(train =>
    <ListItem key={train} props={props[train]} />,
  );
  return (
    <div className="flex-container">{listItems}</div>
  );
};

export default HomePage;
