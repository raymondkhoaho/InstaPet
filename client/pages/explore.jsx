import React from 'react';
import { Container, Image } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import LikeButton from '../components/heart-button';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      photoIndex: null,
      isOpen: false
    };
  }

  componentDidMount() {
    fetch('/api/photos')
      .then(res => res.json())
      .then(photos => this.setState({ photos }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.photos) return null;
    const photosList = this.state.photos;
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
    const photos = photosList.map((photo, index) => {
      const { imageUrl, photoId, caption } = photo;
      return (
        <Image
          onLoad={onPhotoLoad}
          key={photoId}
          src={imageUrl}
          alt={caption}
          onClick={() => this.setState({ isOpen: true, photoIndex: index })} />
      );
    });
    const { photoIndex, isOpen } = this.state;
    return (
      <Container>
        <div>
          <h3 className="mt-2">
            Explore
          </h3>
        </div>
        <div>
          <div className="photo-gallery d-flex flex-wrap">
            {photos}
            {isOpen && (
              <>
                <Lightbox
                imageCaption={photos[photoIndex].props.alt}
                imagePadding={50}
                mainSrc={photos[photoIndex].props.src}
                nextSrc={photos[(photoIndex + 1) % photosList.length].props.src}
                prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].props.src}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + photosList.length - 1) % photos.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % photos.length
                  })
                }
              />
                <LikeButton />
              </>
            )}
          </div>
        </div>
      </Container>
    );
  }
}
