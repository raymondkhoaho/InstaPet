import React from 'react';
// import Image from 'react-bootstrap/Image';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
        <img onLoad={onPhotoLoad} key={photoId} src={imageUrl} alt='photo' />
      );
    });

    return (
      <div id="gallery-container" className="container mt-5 pt-5">
        <div id="gallery" className="img-gallery">
          {photos}
        </div>
      </div>
    );
  }
}
