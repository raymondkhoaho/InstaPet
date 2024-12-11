import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import LikeButton from '../components/heart-button';

const Explore = () => {
  const [photos, setPhotos] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/photos')
      .then(res => res.json())
      .then(setPhotos)
      .catch(err => console.error(err));
  }, []);

  if (!photos) return null;

  const onPhotoLoad = ({ target: photo }) => {
    const { offsetHeight, offsetWidth } = photo;
    if (offsetWidth > offsetHeight) {
      photo.className = 'landscape';
    } else if (offsetWidth < offsetHeight) {
      photo.className = 'portrait';
    } else {
      photo.className = 'square';
    }
  };

  const handlePhotoClick = index => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  const handleClose = () => setIsOpen(false);

  const handlePrev = () => {
    setPhotoIndex((photoIndex + photos.length - 1) % photos.length);
  };

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % photos.length);
  };

  return (
    <Container>
      <div>
        <h3 className="mt-2">
          Explore
        </h3>
      </div>
      <div>
        <div className="photo-gallery d-flex flex-wrap">
          {photos.map((photo, index) => (
            <Image
              onLoad={onPhotoLoad}
              key={photo.photoId}
              src={photo.imageUrl}
              alt={photo.caption}
              onClick={() => handlePhotoClick(index)}
            />
          ))}
          {isOpen && (
            <>
              <Lightbox
                imageCaption={photos[photoIndex].caption}
                imagePadding={50}
                mainSrc={photos[photoIndex].imageUrl}
                nextSrc={photos[(photoIndex + 1) % photos.length].imageUrl}
                prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].imageUrl}
                onCloseRequest={handleClose}
                onMovePrevRequest={handlePrev}
                onMoveNextRequest={handleNext}
              />
              <LikeButton />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Explore;
