import { useEffect, useRef, useState, useImperativeHandle } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClick = () => {
    console.log("btn is clicked!");
    setState((prev) => prev + 1);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      < div className='title' >
        <div className='title-text'>
          <p className="b-regular">로그인</p>
        </div>
        <div className='title-line'>
        </div>
      </div>
      < div className='body' >
        <p className="r-large">이메일</p>
      </div>
      <InputCommon
        className={`button large r-large gray`}
        value={email}
        onChange={handleEmailChange}
      >
      </InputCommon>
      < div className='body' >
        <p className="r-large">비밀번호</p>
      </div>
      <InputCommon
        className={`button large r-large gray`}
        type="password"
        value={password}
        onChange={handlePasswordChange}
      >
      </InputCommon>
      <div style={{ marginTop: '230px' }}>
        <p className="r-medium">비밀번호를 잊으셨나요?</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <ButtonCommon
          className='button big b-small blue'
          onClickBtn={() => navigate(`/home`)}
        >
          로그인
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Login;
