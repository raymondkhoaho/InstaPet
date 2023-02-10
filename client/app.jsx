import React from 'react';
import jwtDecode from 'jwt-decode';
import AuthForm from './components/auth-form';
import Explore from './pages/explore';
import Users from './pages/users';
import UserPage from './pages/user-page';
import NavBar from './components/navbar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import 'react-image-lightbox/style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    const { path, params } = this.state.route;
    if (path === 'explore' || path === '') {
      return <Explore />;
    } else if (path === 'sign-in' || path === 'sign-up') {
      return <AuthForm action={path} />;
    } else if (path === 'users') {
      return <Users />;
    } else if (path === 'user') {
      const username = params.get('username');
      return <UserPage username={username} />;
    } else {
      return null;
    }
  }

  renderNavBar() {
    const { path } = this.state.route;
    if (path !== 'sign-in' && path !== 'sign-up') {
      return <NavBar />;
    } else {
      return null;
    }
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          { this.renderNavBar() }
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
NavBar.contextType = AppContext;
AuthForm.contextType = AppContext;
