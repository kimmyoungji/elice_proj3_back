import useApi from './useApi';

type presignedUrlProps = {
  fileName?: string;
  path: any;
};

const usePresignedUrl = ({ fileName, path }: presignedUrlProps) => {
  const { trigger, result, error, loading } = useApi({
    method: 'post',
    shouldInitFetch: false,
  });

  const getPresignedUrl = async ({ fileName, path }: presignedUrlProps) => {
    await trigger({ path: path, data: { fileName } });
    return { presignedUrl: result, error, loading };
  };

  return { getPresignedUrl };
};

export default usePresignedUrl;
