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
    console.log('멀티파트 폼데이터',formData)

    // Get the presigned URL from the backend
    const presignedResponse = await fetch(`http://localhost:5001/image/presigned-url/upload/food/${image.name}`, {
      method: 'POST',
      body: formData,
    });
    const presignedUrl = await presignedResponse.text();
    console.log("프리사인드 유알엘",presignedUrl);

    // Use the presigned URL to upload the image to S3
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-Type': image.type,
      },
    });

    console.log('업로드 응답', uploadResponse);
    console.log('이미지 유알엘', imageUrl);

    if (!uploadResponse.ok) {
      throw new Error('Upload failed');
    }

    setImageUrl(uploadResponse.url);
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