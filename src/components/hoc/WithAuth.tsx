import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/index';

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC = (props: any) => {
    const isLoggedIn = useSelector(
      (state: RootState) => state.user.username !== ''
    );
    const userData = localStorage.getItem('userData');

    if (!isLoggedIn && !userData) {
      return <Navigate to='/login' />;
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuth;
