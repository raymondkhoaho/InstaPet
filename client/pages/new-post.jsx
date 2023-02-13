import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('caption', this.state.caption);
    formData.append('image', this.fileInputRef.current.files[0]);

    fetch('/api/uploads', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(parsedResponse => {
        // eslint-disable-next-line no-console
        console.log(parsedResponse);
        this.setState({ caption: '' });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
          <div className="col col-md-8">
            <h3 className="text-center mb-5">Upload Image</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Caption
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  id="caption"
                  name="caption"
                  value={this.state.caption}
                  onChange={this.handleCaptionChange}
                  className="form-control bg-light" />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <input
                  required
                  type="file"
                  name="image"
                  ref={this.fileInputRef}
                  accept=".png, .jpg, .jpeg, .gif" />
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
