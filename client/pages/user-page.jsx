import React, { useEffect, useState } from 'react';
import { Image, Container } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';

const UserPage = ({ username }) => {
  const [user, setUser] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${username}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [username]);

  if (!user) return null;

  const { headerImageUrl, profileImageUrl, username: userName } = user[0];

  const handlePhotoLoad = ({ target: photo }) => {
    const { offsetHeight, offsetWidth } = photo;
    if (offsetWidth > offsetHeight) {
      photo.className = 'landscape';
    } else if (offsetWidth < offsetHeight) {
      photo.className = 'portrait';
    } else {
      photo.className = 'square';
    }
  };

  const photos = user.map((photo, index) => {
    const { imageUrl, photoId, caption } = photo;
    return (
      <Image
        onLoad={handlePhotoLoad}
        key={photoId}
        src={imageUrl}
        alt={caption}
        onClick={() => {
          setIsOpen(true);
          setPhotoIndex(index);
        }}
      />
    );
  });

  return (
    <>
      <div className="header-container">
        <Image className="header-image" src={headerImageUrl} alt="header-image" />
        <Image
          className="profile-image"
          src={profileImageUrl}
          alt="profile-image"
          roundedCircle
          style={{ width: '125px', height: '125px' }}
        />
        <h2 className="header-username">{userName}</h2>
      </div>
      <Container>
        <div>
          <div className="photo-gallery d-flex flex-wrap">
            {photos}
            {isOpen && (
              <Lightbox
                imageCaption={photos[photoIndex].props.alt}
                imagePadding={50}
                mainSrc={photos[photoIndex].props.src}
                nextSrc={photos[(photoIndex + 1) % user.length].props.src}
                prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].props.src}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex((photoIndex + user.length - 1) % photos.length)
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % photos.length)
                }
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserPage;
