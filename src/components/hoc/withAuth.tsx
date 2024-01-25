import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/index';

const withAuth = (WrappedComponent: React.ComponentType<any>): React.FC => {
  const WithAuth: React.FC = (props) => {
    const isLoggedIn = useSelector(
      (state: RootState) => state.user.username !== ''
    );
    const userData = localStorage.getItem('userData');

    if (!isLoggedIn && !userData) {
      return <Navigate to='/login' />;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuth;
};

export default withAuth;
