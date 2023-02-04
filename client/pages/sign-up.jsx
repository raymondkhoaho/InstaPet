import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpSuccess: false,
      alert: false,
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      // eslint-disable-next-line no-console
      console.log('pw no match');
    }
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = 'sign-in';
      }
      );
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="shadow px-4">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center logo fs-2">InstaPet</h2>
                    <div className="mb-3">
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">
                            Username
                          </Form.Label>
                          <Form.Control required type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control required type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control required type="password" placeholder="Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        />
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Sign Up
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Already have an account?{' '}
                          <a href="{''}" className="text-primary fw-bold">
                            Sign In
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
