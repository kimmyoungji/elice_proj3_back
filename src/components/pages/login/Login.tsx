import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfo, loginUser } from '@components/store/userLoginRouter';
import useCachingApi from '@hooks/useCachingApi';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, trigger, result } = useCachingApi<any>({
    method: 'post',
    path: 'auth/local/login',
  });

  const userInfo = useSelector<{
    user: {
      userInfo: UserInfo;
    };
  }>((state) => state.user.userInfo.username);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = async () => {
    trigger(
      { email, password },
      {
        onSuccess: (data) => {
          dispatch(loginUser(data.data));
        },
      }
    );
  };

  useEffect(() => {
    //유저 healthinfo가 없으면 onboarding,
    //있으면 home
    if (result && result.status === 200) {
      if (userInfo) {
        navigate('/home');
      } else {
        navigate('/onboarding/1');
      }
    }
  }, [userInfo]);

  return (
    <div className='login-container'>
      <div className='body'>
        <p className='r-large'>이메일</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          className={`button large r-large gray`}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className='body'>
        <p className='r-large'>비밀번호</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          className={`button large r-large gray`}
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className='button-container'>
        <div style={{ marginBottom: '20px' }}>
          <p className='r-medium'>비밀번호를 잊으셨나요?</p>
        </div>
        <ButtonCommon
          variant='default-active'
          size='big'
          onClickBtn={handleLogin}
          disabled={loading}
        >
          {loading ? '로그인 하는중' : '로그인'}
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Login;
