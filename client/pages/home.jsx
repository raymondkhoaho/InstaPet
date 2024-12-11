import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Explore from './explore';

const Home = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  return <Explore />;
};

export default Home;
