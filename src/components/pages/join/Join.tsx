import { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import useApi from '@hooks/useApi';
import './Onboarding.css';
import useCachingApi from '@hooks/useCachingApi';

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

  const {
    result: signUpResult,
    loading: signUpLoading,
    trigger: signUpTrigger,
  } = useApi<any>({
    method: 'post',
    path: 'auth/local/signup',
    data: { username, email, password },
  });

  const { trigger: mailVerifyTrigger } = useCachingApi({ path: '' });
  const { trigger: logoutTrigger } = useCachingApi({ path: '/auth/logout' });

  useEffect(() => {
    if (signUpResult.data === '회원가입 성공' && signUpResult.status === 200) {
      navigate('/');
    }
  }, [signUpResult]);

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
    signUpTrigger({
      data: { username, email, password },
    });
  };

  const handleEmailAuth = () => {
    mailVerifyTrigger({});
  };

  //회원가입 페이지 진입시 로그아웃
  useEffect(() => {
    logoutTrigger('');
  }, []);

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
            top: '-40%',
            transform: 'translateY(-130%)',
          }}
          onClickBtn={handleEmailAuth}
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
            transform: 'translateY(-130%)',
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
      <div className='button-container' style={{ marginTop: '20px' }}>
        <ButtonCommon
          variant='default-active'
          size='big'
          onClickBtn={handleSignUp}
          disabled={signUpLoading}
        >
          {signUpLoading ? '가입 하는중' : '가입하기'}
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Join;
