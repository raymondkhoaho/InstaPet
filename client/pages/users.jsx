import React from 'react';
import { Container, Image, Nav } from 'react-bootstrap';

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
        <div key={userId} className="p-1 col-12 col-md-6 col-lg-4">
          <Nav.Link href={`#user?username=${username}`} className="card-container">
            <div>
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
              <p>
                {username}
              </p>
            </div>
          </Nav.Link>
        </div>

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
