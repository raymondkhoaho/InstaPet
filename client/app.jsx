import React, { useState, useEffect, useCallback, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import AuthForm from './components/auth-form';
import Home from './pages/home';
import Users from './pages/users';
import UserPage from './pages/user-page';
import NavBar from './components/navbar';
import NewPost from './pages/new-post';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import 'react-image-lightbox/style.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);

    const token = window.localStorage.getItem('react-context-jwt');
    const decodedUser = token ? jwtDecode(token) : null;
    setUser(decodedUser);
    setIsAuthorizing(false);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSignIn = useCallback((result) => {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    setUser(user);
  }, []);

  const handleSignOut = useCallback(() => {
    window.localStorage.removeItem('react-context-jwt');
    setUser(null);
    window.location.hash = '';
  }, []);

  const renderPage = () => {
    const { path, params } = route;
    switch (path) {
      case '':
      case 'explore':
        return <Home />;
      case 'sign-in':
      case 'sign-up':
        return <AuthForm action={path} />;
      case 'users':
        return <Users />;
      case 'user':
        const username = params.get('username');
        return <UserPage username={username} />;
      case 'newpost':
        return <NewPost />;
      default:
        return null;
    }
  };

  const renderNavBar = () => (user ? <NavBar /> : null);

  if (isAuthorizing) return null;

  const contextValue = { user, route, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <>
        {renderNavBar()}
        {renderPage()}
      </>
    </AppContext.Provider>
  );
};

export default App;
