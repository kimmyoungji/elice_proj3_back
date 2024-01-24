import { useEffect, useRef, useState, useImperativeHandle } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import useApi from '@hooks/useApi';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, trigger } = useApi({
    method: 'post',
    path: '/auth/local/login',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const result = await trigger({
      data: { email, password },
    });

    if (result && result.status === 200) {
      navigate('/home');
    }
  };

  return (
    <div className="login-container">

      < div className='body' >
        <p className="r-large">이메일</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          className={`button large r-large gray`}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      < div className='body' >
        <p className="r-large">비밀번호</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          className={`button large r-large gray`}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className='button-container'>
        <div style={{ marginBottom: '20px' }}>
          <p className="r-medium">비밀번호를 잊으셨나요?</p>
        </div>
        <ButtonCommon
          variant="default-active"
          size="big"
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
