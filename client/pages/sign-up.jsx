import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpSuccess: false,
      alert: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('hello');
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
                          <Form.Control required type="text" placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control required type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control required type="password" placeholder="Password" />
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
