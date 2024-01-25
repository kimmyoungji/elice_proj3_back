import useApi from './useApi';

type S3ImgUploadProps = {
  method: any;
  file: string;
  presignedUrl: string;
};

const useS3ImgUpload = ({ method, presignedUrl, file }: S3ImgUploadProps) => {
  const { trigger, result, error, loading } = useApi({
    method: method,
    shouldInitFetch: false,
  });

  const uploadToS3 = async ({
    method,
    presignedUrl,
    file,
  }: S3ImgUploadProps) => {
    await trigger({ method: method, path: presignedUrl, data: file });
    return { error, loading };
  };

  return { uploadToS3 };
};

export default useS3ImgUpload;
