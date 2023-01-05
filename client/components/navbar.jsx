import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';

export default function NavBar(props) {
  const user = (
    <Image
      src="/images/ryleyleho1.JPG"
      alt="UserName profile image"
      className="profile"
      roundedCircle
      style={{
        width: '50px',
        height: '50px'
      }}
    />
  );
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="logo fs-2" href="#explore">InstaPet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-lg-flex align-items-center">
              <Nav.Link href="#explore"><i className="fa-solid fa-magnifying-glass" />Explore</Nav.Link>
              <Nav.Link href="#users"><i className="icon fa-solid fa-users" />Users</Nav.Link>
              <Nav.Link href="#newpost"><i className="fa-solid fa-circle-plus" />New Post</Nav.Link>
              <Nav.Link href="#profile">{ user }</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
