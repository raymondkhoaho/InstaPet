import React, { useState } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <div onClick={handleLikeToggle} style={{ cursor: 'pointer' }}>
      {liked
        ? (<HeartFill className="likebutton" color="royalblue" size={24} />)
        : (<Heart className="likebutton" color="royalblue" size={24} />)}
    </div>
  );
};

export default LikeButton;
