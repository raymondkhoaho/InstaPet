// /* eslint-disable no-console */
// import React from 'react';
// import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
// import AppContext from '../lib/app-context';
// import AlertDismissable from './pw-fail';

// export default class AuthForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       signUpSuccess: false,
//       alert: false,
//       username: '',
//       password: '',
//       confirmPassword: ''
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleDemo = this.handleDemo.bind(this);
//   }

//   handleChange(event) {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const { action } = this.props;
//     if (action === 'sign-up' && (this.state.password !== this.state.confirmPassword)) {
//       this.setState({ alert: true });
//     } else {
//       const req = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(({
//           username: this.state.username.toLowerCase(),
//           password: this.state.password,
//           confirmPassword: this.state.confirmPassword
//         }))
//       };
//       fetch(`/api/auth/${action}`, req)
//         .then(res => res.json())
//         .then(result => {
//           if (action === 'sign-up') {
//             window.location.hash = 'sign-in';
//           } else if (result.user && result.token) {
//             this.context.handleSignIn(result);
//             window.location.hash = '';
//           }
//         });
//     }
//   }

//   handleDemo(event) {
//     this.setState({
//       username: 'demo',
//       password: 'password'
//     });
//   }

//   render() {
//     const { action } = this.props;
//     const { handleChange, handleSubmit, handleDemo } = this;
//     const alternateActionHref = action === 'sign-up'
//       ? '#sign-in'
//       : '#sign-up';
//     const alternateActionText = action === 'sign-up'
//       ? 'Already have an account? '
//       : 'Create new account? ';
//     const alternateActionTextLink = action === 'sign-up'
//       ? 'Sign in instead'
//       : 'Register now';
//     const submitButtonText = action === 'sign-up'
//       ? 'Sign Up'
//       : 'Sign In';
//     const confirmFieldShow = action === 'sign-up'
//       ? 'mb-3'
//       : 'd-none';
//     const demoAutoFill = action === 'sign-in'
//       ? 'mt-3 text-center'
//       : 'd-none';
//     const alert = this.state.alert === true
//       ? <AlertDismissable />
//       : null;

//     return (
//       <div>
//         <Container>
//           <Row className="vh-100 d-flex justify-content-center align-items-center">
//             <Col md={8} lg={6} xs={12}>
//               <Card className="shadow px-4">
//                 <Card.Body>
//                   <div className="mb-3 mt-md-4">
//                     <h2 className="fw-bold mb-2 text-center logo fs-2">InstaPet</h2>
//                     <div className="mb-3">
//                       <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3" controlId="Name">
//                           <Form.Label className="text-center">
//                             Username
//                           </Form.Label>
//                           <Form.Control required type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={handleChange} />
//                         </Form.Group>

//                         <Form.Group
//                           className="mb-3"
//                           controlId="formBasicPassword"
//                         >
//                           <Form.Label>Password</Form.Label>
//                           <Form.Control required type="password" placeholder="Password" name="password" value={this.state.password} onChange={handleChange} />
//                         </Form.Group>
//                         <Form.Group
//                           className={confirmFieldShow}
//                           controlId="formBasicPassword"
//                         >
//                           <Form.Label>Confirm Password</Form.Label>
//                           <Form.Control type="password" placeholder="Password" name="confirmPassword" value={this.state.confirmPassword} onChange={handleChange} />
//                         </Form.Group>
//                         {alert}
//                         <Form.Group
//                           className="mb-3"
//                           controlId="formBasicCheckbox"
//                         />
//                         <div className="d-grid">
//                           <Button variant="primary" type="submit">
//                             {submitButtonText}
//                           </Button>
//                         </div>
//                         <div className={demoAutoFill}>
//                           <Button variant="primary" type="button" onClick={handleDemo}>Demo</Button>
//                         </div>
//                       </Form>
//                       <div className="mt-3 text-center">
//                         <p className="mb-0  text-center">
//                           {alternateActionText}
//                           <a href={alternateActionHref} className="text-primary fw-bold">
//                             {alternateActionTextLink}
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// AuthForm.contextType = AppContext;

/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import AppContext from '../lib/app-context';
import AlertDismissable from './pw-fail';

const AuthForm = ({ action }) => {
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const context = useContext(AppContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (action === 'sign-up' && password !== confirmPassword) {
      setAlert(true);
    } else {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          password,
          confirmPassword,
        }),
      };
      fetch(`/api/auth/${action}`, req)
        .then((res) => res.json())
        .then((result) => {
          if (action === 'sign-up') {
            window.location.hash = 'sign-in';
          } else if (result.user && result.token) {
            context.handleSignIn(result);
            window.location.hash = '';
          }
        });
    }
  };

  const handleDemo = () => {
    setUsername('demo');
    setPassword('password');
  };

  const alternateActionHref = action === 'sign-up' ? '#sign-in' : '#sign-up';
  const alternateActionText = action === 'sign-up' ? 'Already have an account? ' : 'Create new account? ';
  const alternateActionTextLink = action === 'sign-up' ? 'Sign in instead' : 'Register now';
  const submitButtonText = action === 'sign-up' ? 'Sign Up' : 'Sign In';
  const confirmFieldShow = action === 'sign-up' ? 'mb-3' : 'd-none';
  const demoAutoFill = action === 'sign-in' ? 'mt-3 text-center' : 'd-none';
  const alertMessage = alert ? <AlertDismissable /> : null;

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
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Username"
                          name="username"
                          value={username}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className={confirmFieldShow} controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {alertMessage}
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          {submitButtonText}
                        </Button>
                      </div>
                      <div className={demoAutoFill}>
                        <Button variant="primary" type="button" onClick={handleDemo}>
                          Demo
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3 text-center">
                      <p className="mb-0 text-center">
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
};

export default AuthForm;
