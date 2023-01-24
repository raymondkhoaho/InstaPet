import React from 'react';
import { Image, Container } from 'react-bootstrap';

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
        onLoad={onPhotoLoad}
        key={photoId}
        src={imageUrl}
        alt={caption}
        onClick={() => this.setState({ isOpen: true, photoIndex: index })} />
      );
    });

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
            </div>
          </div>
        </Container>
      </>
    );
  }
}
