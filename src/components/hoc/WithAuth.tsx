import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../store/index';
import { useEffect, useMemo, useState } from 'react';
import { loginUser } from '@components/store/userLoginRouter';
import useCachingApi from '@hooks/useCachingApi';
import { UserInfo } from '@components/store/userLoginRouter';

const onboardingPaths = [
  { field: 'gender', path: '/onboarding/1' },
  { field: 'age', path: '/onboarding/2' },
  { field: 'height', path: '/onboarding/3' },
  { field: 'weight', path: '/onboarding/4' },
  { field: 'dietGoal', path: '/onboarding/5' },
  { field: 'activityAmount', path: '/onboarding/6' },
];

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.user.userInfo);
    const isLoggedIn = userData && userData.username !== '';

    const isUserInfoFilled =
      userData &&
      (userData.dietGoal &&
        userData.gender &&
        userData.height &&
        userData.activityAmount &&
        userData.weight &&
        userData.birthday) !== null;

    type CachingType = {
      data: UserInfo;
    };

    const { trigger, result } = useCachingApi<CachingType>({
      path: '/user',
    });

    console.log(isUserInfoFilled);
    useEffect(() => {
      if (!isLoggedIn) {
        trigger('', {
          onSuccess: (data) => {
            if (data) {
              dispatch(loginUser(data.data));
            }
            if (!userData || !userData.username) {
              return <Navigate to='/' />;
            }
          },
        });
      } else {
        if (isLoggedIn && !isUserInfoFilled) {
          for (const { field, path } of onboardingPaths) {
            if (!(userData as any)[field]) {
              console.log(field);
              navigate(path);
              return;
            }
          }
        }
      }
    }, [isLoggedIn, userData]);

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuth;
