const getImgPreview = (
  imgFile: File,
  setProfileImage: React.Dispatch<React.SetStateAction<string | undefined>>,
  callback: (file: File) => void
) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    setProfileImage(event.target?.result as string);
    callback(imgFile);
  };
  reader.readAsDataURL(imgFile);
};

export default getImgPreview;
