const getImgPreview = (
  imgFile: File,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  setProfileImage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  setFile(imgFile);

  if (imgFile) {
    const reader = new FileReader();

    reader.onload = (event) => {
      setProfileImage(event.target?.result as string);
    };
    reader.readAsDataURL(imgFile);
  }
};

export default getImgPreview;
