import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/index';
import useApi, { TriggerType } from '@hooks/useApi';
import { useEffect } from 'react';
import { storeUserInfo } from '@components/store/userLoginRouter';

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC = (props: any) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
      (state: RootState) => state.user.username !== ''
    );
    const {
      trigger,
    }: {
      trigger: TriggerType;
    } = useApi({
      path: '/user',
      shouldInitFetch: false,
    });

    useEffect(() => {
      if (!isLoggedIn) {
        trigger({
          applyResult: true,
        }).then((response) => {
          if (response && response.data) {
            dispatch(storeUserInfo(response.data.userInfo));
          }
        });
      }
    }, [isLoggedIn, trigger, dispatch]);

    if (!isLoggedIn) {
      return <Navigate to='/' />;
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuth;
