/* eslint-disable no-console */
import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import AppContext from '../lib/app-context';

// import AlertDismissable from './pw-fail';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpSuccess: false,
      alert: false,
      required: null,
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
    const { action } = this.props;
    if (action === 'sign-up' && (this.state.password !== this.state.confirmPassword)) {
      // eslint-disable-next-line no-console
      console.log('pw no match');
    } else {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      };
      fetch(`/api/auth/${action}`, req)
        .then(res => res.json())
        .then(result => {
          if (action === 'sign-up') {
            window.location.hash = 'sign-in';
          } else if (result.user && result.token) {
            this.context.handleSignIn(result);
            window.location.hash = '';
          }
        });
    }
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Already have an account? '
      : 'Create new account? ';
    const alternateActionTextLink = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Sign Up'
      : 'Sign In';
    const confirmFieldShow = action === 'sign-up'
      ? 'mb-3'
      : 'd-none';

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
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">
                            Username
                          </Form.Label>
                          <Form.Control required type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control required type="password" placeholder="Password" name="password" value={this.state.password} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group
                          className={confirmFieldShow}
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" name="confirmPassword" value={this.state.confirmPassword} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        />
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            {submitButtonText}
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3 text-center">
                        <p className="mb-0  text-center">
                          {alternateActionText}
                          <a href={alternateActionHref} className="text-primary fw-bold">
                            {alternateActionTextLink}
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

AuthForm.contextType = AppContext;
