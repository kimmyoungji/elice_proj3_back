import { useEffect } from 'react';
import { API_FETCHER, ApiMethods } from '@utils/axiosConfig';
import useMutationggu from './useMutationggu';

interface UseApiParams {
  method?: ApiMethods;
  path: string;
  data?: any;
  shouldInitFetch?: boolean;
  initialResult?: string;
  gcTime?: number;
  applyResult?: boolean;
  isShowBoundary?: boolean;
}

const useCachingApi = async ({
  method: triggerMethod = 'get',
  path: triggerPath = '',
  data: triggerData = {},
  shouldInitFetch = false,
  applyResult = true,
  isShowBoundary = true,
  // initialResult = '',
  gcTime = 0,
}: UseApiParams) => {
  // }) => {
  const key = triggerPath;

  const keyArr: string[] = [];
  keyArr.push(key);

  const {
    mutate: trigger,
    data: result,
    isPending: loading,
    error,
  } = useMutationggu(
    keyArr,
    async (data = triggerData) =>
      await API_FETCHER[triggerMethod as ApiMethods](triggerPath, data),
    gcTime,
    applyResult,
    isShowBoundary,
    triggerMethod
  );

  useEffect(() => {
    shouldInitFetch && console.log('초기 요청합니다!!');
    shouldInitFetch && trigger(triggerPath, triggerData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reqIdentifier = triggerMethod + 'data';

  return { result, loading, reqIdentifier, trigger, error };
};

export default useCachingApi;
