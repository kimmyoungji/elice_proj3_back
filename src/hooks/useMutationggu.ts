import { APiFetcher, ApiMethods } from '@utils/axiosConfig';
import { MutationFunction, QueryClient, useMutation } from 'react-query';
import useConfirm from './useConfirm';
import { AxiosResponse } from 'axios';

//c ud일때

const queryClient = new QueryClient({});
const useMutationggu = (
  itemId: string,
  gc: number,
  trigger: MutationFunction<any, string>
) => {
  return useMutation(trigger, {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(itemId);

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
      queryClient.invalidateQueries(itemId);
    },
    onError: async (error, variables, context) => {
      //confirm을 받았을 때 재요청하기
      const onConfirmRefetch = async () => {
        await trigger(variables);
      };
      const onCancel = () => {
        if (context?.previousValue) {
          // error가 발생하면 onMutate에서 반환된 값으로 다시 롤백
          queryClient.setQueryData(itemId, context.previousValue);
        }
      };
      const onConfirm = useConfirm(
        '데이터 요청에 실패했습니다. 재요청 하시겠습니까?',
        onConfirmRefetch,
        onCancel
      );

      onConfirm?.();
    },
    onSettled: async () => {},
  });
};

export default useMutationggu;
