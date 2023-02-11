import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import AppContext from '../lib/app-context';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    const { profileImageUrl, username } = this.context.user;
    const user = (
      <Image
        src={profileImageUrl}
        alt={username}
        className="user-profile-image"
        roundedCircle
        style={{
          width: '50px',
          height: '50px'
        }}
      />
    );
    return (
      <div>
        <Navbar collapseOnSelect className="navbar-top" fixed="top" bg="light" expand="lg">
          <Container>
            <Navbar.Brand className="logo fs-2" href="#explore">InstaPet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-lg-flex align-items-center">
                <Nav.Link href="#explore"><i className="fa-solid fa-magnifying-glass p-2" />Explore</Nav.Link>
                <Nav.Link href="#users"><i className="icon fa-solid fa-users p-2" />Users</Nav.Link>
                <Nav.Link href="#newpost"><i className="fa-solid fa-circle-plus p-2" />New Post</Nav.Link>
                <Nav.Link href="#profile">{ user }</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

NavBar.contextType = AppContext;
