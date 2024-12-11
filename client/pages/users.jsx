import React, { useState, useEffect } from 'react';
import { Container, Image, Nav } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  if (!users) return null;

  return (
    <Container>
      <div>
        <h3 className="mt-2">Users</h3>
      </div>
      <div>
        <div className="user-gallery d-flex flex-wrap">
          {users.map(({ profileImageUrl, userId, username }) => (
            <div key={userId} className="p-1 col-12 col-md-6 col-lg-4">
              <Nav.Link href={`#user?username=${username}`} className="card-container">
                <div>
                  <Image
                    src={profileImageUrl}
                    alt={username}
                    className="user-profile-image p-2"
                    roundedCircle
                    style={{ width: '100px', height: '100px' }}
                  />
                  <p>{username}</p>
                </div>
              </Nav.Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Users;
