import React, { useState, useRef } from 'react';

const NewPost = () => {
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleCaptionChange = event => {
    setCaption(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', fileInputRef.current.files[0]);

    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setCaption('');
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8">
          <h3 className="text-center mb-5">Upload Image</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="caption" className="form-label">
                Caption
              </label>
              <input
                required
                autoFocus
                type="text"
                id="caption"
                name="caption"
                value={caption}
                onChange={handleCaptionChange}
                className="form-control bg-light"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <input
                required
                type="file"
                name="image"
                ref={fileInputRef}
                accept=".png, .jpg, .jpeg, .gif"
              />
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
