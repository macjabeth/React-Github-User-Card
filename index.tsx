import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle
} from 'reactstrap';

const UserCard = (props: { user: any }) => (
  <li>
    <Card>
      <CardBody>
        <CardTitle>{props.user.name}</CardTitle>
        <CardSubtitle>{props.user.login}</CardSubtitle>
      </CardBody>
      <CardImg width="100%" src={props.user.avatar_url} alt="User Avatar" />
      <CardBody>
        <CardText>{props.user.bio}</CardText>
        <CardLink href={props.user.html_url}>View Profile</CardLink>
      </CardBody>
    </Card>
  </li>
);

const fetchUser = username => fetch(`https://api.github.com/users/${username}`).then(res => res.json());

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch('https://api.github.com/users/macjabeth/followers')
      .then(res => res.json())
      .then(data => {
        Promise.all([
          fetchUser('macjabeth'),
          ...data.map(f => fetchUser(f.login))
        ]).then(users => {
          this.setState({ users });
        });
      });
  }

  render() {
    const { users } = this.state;

    return (
      <ul>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    );
  }
}

render(<App />, document.getElementById('root'));