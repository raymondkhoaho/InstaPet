import React from 'react';
import { Container, Image } from 'react-bootstrap';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null
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
      const { offsetHeight: height, offsetWidth: width } = photo;
      if (width > height) {
        photo.className = 'landscape';
      } else if (width < height) {
        photo.className = 'portrait';
      } else {
        photo.className = 'square';
      }
    };

    let photoId = 0;
    const photos = photosList.map(photo => {
      photoId++;
      const { imageUrl } = photo;
      return (
        <Image onLoad={onPhotoLoad} key={photoId} src={imageUrl} alt='photo' />
      );
    });

    return (
      <Container>
        <div>
          <h3 className="mt-2">
            Explore
          </h3>
        </div>
        <div>
          <div className="photo-gallery">
            {photos}
          </div>
        </div>
      </Container>
    );
  }
}