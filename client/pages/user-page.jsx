import React from 'react';
import { Image, Container } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      photoIndex: null,
      isOpen: false
    };
  }

  componentDidMount() {
    fetch('/api/user/' + this.props.username)
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch(err => console.error(err));

  }

  render() {
    if (!this.state.user) return null;
    const user = this.state.user;
    const { headerImageUrl, profileImageUrl, username } = user[0];
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
    const photos = user.map((photo, index) => {
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
      <>
        <div className="header-container">
          <Image className="header-image" src={headerImageUrl} alt="header-image" />
          <Image className="profile-image" src={profileImageUrl} alt="profile-image" roundedCircle
            style={{
              width: '125px',
              height: '125px'
            }} />
          <h2 className="header-username">{username}</h2>
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
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + user.length - 1) % photos.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % photos.length
                })
              }
            />
              )}
            </div>
          </div>
        </Container>
      </>
    );
  }
}
