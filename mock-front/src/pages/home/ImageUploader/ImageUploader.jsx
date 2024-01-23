import React, { useState } from 'react';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', image);

    // Get the presigned URL from the backend
    const presignedResponse = await fetch(`http://localhost:5001/image/presigned-url/profile/${image.name}`, {
      method: 'POST',
      body: formData,
    });
    const presignedUrl = await presignedResponse.text();

    // Use the presigned URL to upload the image to S3
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-Type': image.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload failed');
    }

    const temp = uploadResponse.url.split('?')[0]
    setImageUrl(temp);
  };

  return (
    <div>
      <input type="file" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}

export default ImageUploader;