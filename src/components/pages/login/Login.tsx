import { useEffect, useRef, useState, useImperativeHandle } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
          customClassName="blue"
          size="big"
          onClickBtn={() => navigate(`/home`)}
        >
          로그인
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Login;
