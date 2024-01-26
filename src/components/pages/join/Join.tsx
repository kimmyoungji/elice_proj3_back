import { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import useApi from '@hooks/useApi';
import './Onboarding.css';

const isPasswordValid = (value: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return regex.test(value);
};

const Join = () => {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verifiedemail, setVerifiedemail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedpassword, setVerifiedpassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { result, loading, trigger } = useApi({
    method: 'post',
    path: 'auth/local/signup',
    data: { username, email, password },
  });

  useEffect(() => {
    if (result) {
      navigate('/onboarding/1');
    }
  }, [result]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerifiedemailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifiedemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    if (newPassword && !isPasswordValid(newPassword)) {
      setPasswordError(
        '영문 대소문자, 숫자, 특수기호를 포함해 8자 이상으로 설정해주세요.'
      );
    } else {
      setPasswordError('');
    }
    setPassword(newPassword);
  };

  const handleVerifiedpasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;

    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
    setVerifiedpassword(confirmPassword);
  };

  const handleSignUp = () => {
    trigger({
      data: { username, email, password },
    });
  };

  return (
    <div className='join-container'>
      <div className='body'>
        <p className='r-large'>이름</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant='default'
          value={username}
          onChange={handleNameChange}
        />
      </div>
      <div className='body'>
        <p className='r-large'>이메일</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant='default'
          value={email}
          onChange={handleEmailChange}
        />
        <ButtonCommon
          variant='default-active'
          size='ssmall'
          style={{
            position: 'relative',
            right: '-75%',
            top: '-30%',
            transform: 'translateY(-50%)',
          }}
        >
          이메일 인증
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '-20px' }}>
        <InputCommon
          variant='default'
          value={verifiedemail}
          onChange={handleVerifiedemailChange}
        />
        <ButtonCommon
          variant='default-active'
          size='ssmall'
          style={{
            position: 'relative',
            right: '-75%',
            top: '-30%',
            transform: 'translateY(-50%)',
          }}
        >
          인증하기
        </ButtonCommon>
      </div>
      <div className='body'>
        <div style={{ marginTop: '-25px' }}>
          <p className='r-large'>비밀번호</p>
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant={passwordError ? 'error' : 'default'}
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <div
          style={{ marginTop: '6px', marginLeft: '10px', textAlign: 'left' }}
        >
          {passwordError && <p className='r-regular'>{passwordError}</p>}
        </div>
      </div>
      <div className='body'>
        <p className='r-large'>비밀번호 확인</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <InputCommon
          variant={confirmPasswordError ? 'error' : 'default'}
          type='password'
          value={verifiedpassword}
          onChange={handleVerifiedpasswordChange}
        />
        <div
          style={{ marginTop: '6px', marginLeft: '10px', textAlign: 'left' }}
        >
          {confirmPasswordError && (
            <p className='r-regular'>{confirmPasswordError}</p>
          )}
        </div>
      </div>
      <div className='button-container'>
        <ButtonCommon
          variant='default-active'
          size='big'
          onClickBtn={handleSignUp}
          disabled={loading}
        >
          {loading ? '가입 하는중' : '가입하기'}
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Join;
