import React, { useEffect, useState } from 'react';
import InputCommon from '@components/UI/InputCommon';
import './Onboarding.css';
import { OnboardingProps } from './OnboardingGender';

const OnboardingBirth: React.FC<OnboardingProps> = ({
  userData,
  onClickOnboarding,
}) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

  const onBlurSetBirth = () => {
    onClickOnboarding({ ['birthDay']: `${year}-${month}-${date}` });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <h1 className='b-medium'>생년월일을 입력해주세요</h1>
      <div style={{ marginTop: '30px' }}>
        <InputCommon
          variant='default'
          value={year}
          placeholder='년'
          onChange={handleYearChange}
          onBlur={onBlurSetBirth}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          width: '350px',
          margin: '15px auto',
        }}
      >
        <InputCommon
          style={{ width: '170px' }}
          variant='default'
          value={month}
          placeholder='월'
          onChange={handleMonthChange}
          onBlur={onBlurSetBirth}
        />
        <InputCommon
          style={{ width: '170px' }}
          variant='default'
          value={date}
          placeholder='일'
          onChange={handleDateChange}
          onBlur={onBlurSetBirth}
        />
      </div>
    </div>
  );
};

export default OnboardingBirth;
