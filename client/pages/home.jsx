import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Explore from './explore';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    if (!this.context.user) return <Redirect to='sign-in' />;

    return <Explore />;
  }

}

Home.contextType = AppContext;
