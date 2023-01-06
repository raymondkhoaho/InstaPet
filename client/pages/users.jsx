import React from 'react';
import { Container, Image, Card } from 'react-bootstrap';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  handleClick() {
    // eslint-disable-next-line no-console
    console.log('hello');
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.users) return null;
    const usersList = this.state.users;
    const users = usersList.map(user => {
      const { profileImageUrl, userId, username } = user;
      return (
        <Card key={userId} className="col-12 col-md-6 col-lg-4" onClick={this.handleClick}>
          <Image
            key={userId}
            src={profileImageUrl}
            alt={username}
            className="user-profile-image p-2"
            roundedCircle
            style={{
              width: '100px',
              height: '100px'
            }}
          />
          <Card.Body key={`${userId}-body`}>
            <Card.Title key={`${userId}-title`}>
              {username}
            </Card.Title>
          </Card.Body>
        </Card>
      );
    });
    return (
      <Container>
        <div>
          <h3 className="mt-2">
            Users
          </h3>
        </div>
        <div>
          <div className="user-gallery d-flex flex-wrap">
            {users}
          </div>
        </div>
      </Container>
    );
  }
}
