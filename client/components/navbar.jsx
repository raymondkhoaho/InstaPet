import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import AppContext from '../lib/app-context';

const NavBar = () => {
  const { user, handleSignOut } = useContext(AppContext);
  const { profileImageUrl, username } = user;

  return (
    <Navbar collapseOnSelect className="navbar-top" fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="logo fs-2" href="#explore">InstaPet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-lg-flex align-items-center">
            <Nav.Link href="#explore">
              <i className="fa-solid fa-magnifying-glass p-2" />Explore
            </Nav.Link>
            <Nav.Link href="#users">
              <i className="icon fa-solid fa-users p-2" />Users
            </Nav.Link>
            <Nav.Link href="#newpost">
              <i className="fa-solid fa-circle-plus p-2" />New Post
            </Nav.Link>
            <NavDropdown
              title={
                <Image
                  src={profileImageUrl}
                  alt={username}
                  className="user-profile-image"
                  roundedCircle
                  style={{ width: '50px', height: '50px' }}
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignOut} href="#">
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
