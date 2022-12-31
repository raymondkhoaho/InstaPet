import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';

export default function HelloWorld(props) {
  const user = (
    <Image
      src="https://github.com/mshaaban0.png"
      alt="UserName profile image"
      roundedCircle
      style={{ width: '40px' }}
    />
  );
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="logo fs-2" href="#home">InstaPet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-lg-flex align-items-center">
              <Nav.Link href="#explore">Explore</Nav.Link>
              <Nav.Link href="#users">Users</Nav.Link>
              <Nav.Link href="#newpost">New Post</Nav.Link>
              <Nav.Link href="#profile">{ user }</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
