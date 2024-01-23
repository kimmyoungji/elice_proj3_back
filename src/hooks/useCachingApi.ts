import { useEffect, useState, useCallback } from 'react';
import { API_FETCHER, ApiMethods } from '@utils/axiosConfig';
import { useErrorBoundary } from 'react-error-boundary';
import axios from 'axios';
import useMutationggu from './useMutationggu';
import { getKeyFromUrl } from '@utils/getNavProps';

interface UseApiParams {
  method?: ApiMethods;
  path?: string;
  data?: any;
  shouldInitFetch?: boolean;
  initialResult?: string;
  gcTime?: number;
}

// interface TriggerPropsType
//   extends Omit<UseApiParams, 'shouldInitFetch' | 'initialResult'> {
//   applyResult?: boolean;
//   isShowBoundary?: boolean;
// }

const useCachingApi = async ({
  method: triggerMethod = 'get',
  path: triggerPath = '',
  data: triggerData = {},
  shouldInitFetch = false,
  // initialResult = '',
  gcTime = 0,
}: UseApiParams) => {
  const key = getKeyFromUrl(triggerPath);
  //     applyResult = true,
  //     isShowBoundary = true,
  const { showBoundary } = useErrorBoundary();

  const {
    mutate: trigger,
    data: result,
    isLoading: loading,
    error,
  } = useMutationggu(
    key,
    gcTime,
    async (data) =>
      await API_FETCHER[triggerMethod as ApiMethods](triggerPath, data)
  );

  useEffect(() => {
    if (axios.isAxiosError(error)) {
      showBoundary(error);
    }
  }, [error]);

  useEffect(() => {
    shouldInitFetch && console.log('초기 요청합니다!!');
    shouldInitFetch && trigger(triggerPath, triggerData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reqIdentifier = triggerMethod + 'data';

  return { result, loading, reqIdentifier, trigger, error };
};

export default useCachingApi;
