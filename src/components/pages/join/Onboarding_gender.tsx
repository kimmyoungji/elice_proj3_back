import React, { useState } from "react";
import ButtonCommon from '@components/UI/ButtonCommon';
import './Onboarding.css';

interface OnboardingGenderProps {
  userData: {
    gender: number | null;
    birthDay: string | null;
    height: number | null;
    weight: number | null;
    diet_goal: number | null,
    activityAmount: number | null,
  };
}

const Onboarding_gender: React.FC<OnboardingGenderProps> = ({ data }) => {
  const [userData, setUserData] = useState(data)

  const onClick = (gender: string) => {
    setUserData((prevUserData: OnboardingGenderProps) => ({
      ...prevUserData,
      gender: prevUserData.gender === gender ? null : gender,
    }));
  }

  return (
    <div className="onboarding-container">
      <h1 className="b-medium">당신의 성별은 무엇인가요?</h1>
      <div style={{ marginTop: '30px' }}>
        <ButtonCommon
          variant={userData.gender === 'female' ? 'active' : 'default'}
          size="large"
          onClickBtn={() => onClick('female')}
        >
          여성
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.gender === 'male' ? 'active' : 'default'}
          size="large"
          onClickBtn={() => onClick('male')}
        >
          남성
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.gender === 'other' ? 'active' : 'default'}
          size="large"
          onClickBtn={() => onClick('other')}
        >
          기타
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding_gender;
