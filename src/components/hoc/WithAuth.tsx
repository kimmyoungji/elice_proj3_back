import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useActionData } from 'react-router-dom';
import { RootState } from '../store/index';
import { useEffect, useState } from 'react';
import { loginUser } from '@components/store/userLoginRouter';
import useCachingApi from '@hooks/useCachingApi';
import { UserInfo } from '@components/store/userLoginRouter';

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC = (props: any) => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userInfo);
    const isLoggedIn = useSelector(
      (state: RootState) => state.user.userInfo.username !== ''
    );

    type CachingType = {
      data: UserInfo;
    };

    const { trigger, result } = useCachingApi<CachingType>({
      path: '/user',
    });

    useEffect(() => {
      if (!isLoggedIn) {
        trigger('', {
          onSuccess: (data) => {
            console.log(data.data);
            if (data) {
              dispatch(loginUser(data.data));
            }
            if (!userData.username) {
              return <Navigate to='/' />;
            }
          },
        });
      }
    }, [isLoggedIn, result, userData]);

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuth;
