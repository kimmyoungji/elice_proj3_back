import {
  MutationFunction,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient({});
const useMutationggu = (
  itemId: QueryKey,
  trigger: MutationFunction<unknown, {}>,
  gc?: number
) => {
  const { showBoundary } = useErrorBoundary();

  return useMutation({
    mutationFn: trigger,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: itemId });

      // 기존 Query를 가져오는 함수 ( 존재하지 않으면 undefind 반환 )
      const previousValue = queryClient.getQueryData(itemId);

      // if (previousValue) {
      //   // setQueryData(): Query의 캐시된 데이터를 즉시 업데이트하는 동기 함수 ( Query가 존재하지 않으면 생성 )
      //   // 전달받은 variables값을 즉시 새로운 데이터로 업데이트
      //   queryClient.setQueryData(itemId, (oldData) => [...oldData, variables]);
      // }

      // 이전 값 리턴
      return { previousValue };
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: itemId });
    },
    onError: async (error, variables, context) => {
      //confirm을 받았을 때 재요청하기
      showBoundary(error);
      console.log(error);
    },
    onSettled: async () => {},
    throwOnError: true,
    gcTime: gc,
  });
};

export default useMutationggu;
