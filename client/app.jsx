import React from 'react';
import Explore from './pages/explore';
import Users from './pages/users';
import NavBar from './components/navbar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import 'react-image-lightbox/style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'explore' || route.path === '') {
      return <Explore />;
    } else if (route.path === 'users') {
      return <Users />;
    } else {
      return null;
    }
  }

  render() {
    const { user, route } = this.state;
    const contextValue = { user, route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <NavBar />
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
