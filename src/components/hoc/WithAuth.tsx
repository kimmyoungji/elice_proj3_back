import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useActionData } from 'react-router-dom';
import { RootState } from '../store/index';
import { useEffect, useState } from 'react';
import { loginUser } from '@components/store/userLoginRouter';
import useCachingApi from '@hooks/useCachingApi';
import { UserInfo } from '@components/store/userLoginRouter';

// const onboardingPaths = [
//   { field: 'gender', path: '/onboarding/1' },
//   { field: 'age', path: '/onboarding/2' },
//   { field: 'height', path: '/onboarding/3' },
//   { field: 'weight', path: '/onboarding/4' },
//   { field: 'dietGoal', path: '/onboarding/5' },
//   { field: 'activityAmount', path: '/onboarding/6' },
// ];

const path = '/onboarding/1';

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC = (props: any) => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userInfo);
    const isLoggedIn = useSelector(
      (state: RootState) => state.user.userInfo.username !== ''
    );
    const isUserInfoFilled = useSelector(
      (state: RootState) =>
        (state.user.userInfo.dietGoal &&
          state.user.userInfo.gender &&
          state.user.userInfo.height &&
          state.user.userInfo.activityAmount &&
          state.user.userInfo.weight &&
          state.user.userInfo.age) !== null
    );

    const [redirectPath, setRedirectPath] = useState<string | null>(null);
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
            if (data) {
              dispatch(loginUser(data.data));
            }
            if (!userData.username) {
              return <Navigate to='/' />;
            }
          },
        });
      } 
    }, [isLoggedIn, userData]);

    // if (redirectPath) {
    //   return <Navigate to={redirectPath} />;
    // }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuth;
