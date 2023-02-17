import React from 'react';
import { FacebookProvider, Like } from 'react-facebook';

export default class Heart extends React.Component {
  render() {
    return (
      <FacebookProvider appId="123456789">
        <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />
      </FacebookProvider>
    );
  }
}
