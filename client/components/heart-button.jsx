import React from 'react';
import { Heart } from 'react-bootstrap-icons';

export default class LikeButton extends React.Component {
  render() {
    return (
      <Heart className='likebutton' color="royalblue" size={16} />
    );
  }
}
