import React, { useEffect, useState } from "react";
import InputCommon from '@components/UI/InputCommon';
import './Onboarding.css';

interface OnboardingBirthProps {
  setUserData: React.Dispatch<React.SetStateAction<{
    gender: string | null;
    birthDay: string | null;
    height: number | null;
    weight: number | null;
    goal: string | null;
    activity: string | null;
  }>>;
  userData: {
    gender: string | null;
    birthDay: string | null;
    height: number | null;
    weight: number | null;
    goal: string | null;
    activity: string | null;
  };
}

const Onboarding_birth: React.FC<OnboardingBirthProps> = ({ setUserData, userData }) => {
  const [year, setYear] = useState<string>(userData.birthDay?.split('-')[0] || '');
  const [month, setMonth] = useState<string>(userData.birthDay?.split('-')[1] || '');
  const [date, setDate] = useState<string>(userData.birthDay?.split('-')[2] || '');

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      birthDay: `${year}-${month}-${date}` || null,
    }));
  }, [year, month, date, setUserData]);

  useEffect(() => {
    const isYearValid = year !== '';
    const isMonthValid = month !== '';
    const isDateValid = date !== '';
  }, [year, month, date]);

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
      <h1 className="b-medium">생년월일을 입력해주세요</h1>
      <div style={{ marginTop: '30px' }}>
        <InputCommon
          variant="default"
          value={year}
          placeholder='년'
          onChange={handleYearChange}
        />
      </div>
      <div style={{ display: "flex", gap: '10px', width: "350px", margin: '15px auto' }}>
        <InputCommon style={{ width: "170px" }}
          variant="default"
          value={month}
          placeholder='월'
          onChange={handleMonthChange}
        />
        <InputCommon style={{ width: "170px" }}
          variant="default"
          value={date}
          placeholder='일'
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default Onboarding_birth;
