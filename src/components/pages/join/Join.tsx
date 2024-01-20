import { useEffect, useRef, useState, useImperativeHandle } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import './Onboarding.css';

const Join = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verifiedemail, setVerifiedemail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedpassword, setVerifiedpassword] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerifiedemailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifiedemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleVerifiedpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifiedpassword(e.target.value);
  };

  return (
    <div className="join-container">
      < div className='body' >
        <p className="r-large">이름</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant="default"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      < div className='body' >
        <p className="r-large">이메일</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant="default"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant="default"
          value={verifiedemail}
          onChange={handleVerifiedemailChange}
        />
      </div>
      < div className='body' >
        <p className="r-large">비밀번호</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant="default"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      < div className='body' >
        <p className="r-large">비밀번호 확인</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant="default"
          type="password"
          value={verifiedpassword}
          onChange={handleVerifiedpasswordChange}
        />
      </div>
      <div className='button-container'>
        <ButtonCommon
          variant="default-active"
          size="big"
          onClickBtn={() => navigate(`/onboarding/1`)}
        >
          가입하기
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Join;
