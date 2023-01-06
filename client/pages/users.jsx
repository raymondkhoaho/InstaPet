import React from 'react';
import { Container, Image } from 'react-bootstrap';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
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
        <Image
        key={userId}
        src={profileImageUrl}
        alt={username}
        className="user-profile-image"
        roundedCircle
        style={{
          width: '100px',
          height: '100px'
        }}
        />
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
          <div className="user-gallery">
            {users}
          </div>
        </div>
      </Container>
    );
  }
}
