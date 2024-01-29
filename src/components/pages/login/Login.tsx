import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import useApi from '@hooks/useApi';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@components/store/userLoginRouter';
import { RootState } from '@components/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, trigger, result } = useApi<any>({
    method: 'post',
    path: 'auth/local/login',
  });

  const userInfo = useSelector<any>((state) => state.user.username);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    dispatch(loginUser(result.data));
  }, [result]);

  useEffect(() => {
    if (result && result.status === 200) {
      navigate('/home');
    }
  }, [userInfo]);

  const handleLogin: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = async () => {
    const result = await trigger({
      data: { email, password },
    });
  };

  const userData = useSelector((state: RootState) => state.user.userInfo);
  console.log(userData);

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
