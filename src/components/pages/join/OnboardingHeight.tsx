import React, { useEffect, useRef, useState } from 'react';
import './Onboarding.css';
import NumericPad from './NumericPad';

interface OnboardingHeightProps {
  data: {
    gender: number | null;
    birthDay: string;
    height: number | null;
    weight: number | null;
    diet_goal: number | null;
    activityAmount: number | null;
  };
  setUserData: React.Dispatch<React.SetStateAction<{
    gender: number | null;
    birthDay: string | null;
    height: number | null;
    weight: number | null;
    diet_goal: number | null;
    activityAmount: number | null;
  }>>;
}

const OnboardingHeight: React.FC<OnboardingHeightProps> = ({ data, setUserData }) => {
  const [userData, setUserDataLocal] = useState(data);
  const inputHeight = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserDataLocal(data);
  }, [data]);

  useEffect(() => {
    setUserDataLocal((prevUserData) => ({
      ...prevUserData,
      height: data.height !== null ? data.height : null,
    }));
  }, [data]);

  const handleHeightChange = (height: string) => {
    setUserDataLocal((prevUserData) => ({
      ...prevUserData,
      height: height !== '' ? parseInt(height, 10) : null,
    }));
  };

  return (
    <div>
      <h1 className='b-medium'>당신의 키는 얼마인가요?</h1>
      <div style={{ marginTop: '130px', textAlign: 'center' }}>
        <input
          type='text'
          ref={inputHeight}
          placeholder='190'
          className='b-super'
          style={{
            width: '150px',
            textAlign: 'center',
            display: 'inline-block',
            border: 'none',
          }}
          onChange={(e) => handleHeightChange(e.target.value)}
          value={userData.height !== null ? userData.height.toString() : ''}
        />
        <span
          style={{ marginLeft: '5px', verticalAlign: 'top' }}
          className='b-super'
        >
          cm
        </span>
      </div>
      <div style={{ marginTop: '50px' }}>
        <NumericPad inputRef={inputHeight} />
      </div>
    </div>
  );
};

export default OnboardingHeight;
