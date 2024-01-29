import React, { useEffect, useRef, useState } from 'react';
import ButtonCommon from '../../UI/ButtonCommon';
import './Onboarding.css';

interface OnboardingGoalProps {
  data: {
    gender: number | null;
    birthDay: string | null;
    height: number | null;
    weight: number | null;
    diet_goal: number | null;
    activityAmount: number | null;
  };
}

const OnboardingGoal: React.FC<OnboardingGoalProps> = ({ data }) => {
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const onClick = (diet_goal: number) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      diet_goal: prevUserData.diet_goal === diet_goal ? null : diet_goal,
    }));
  };

  return (
    <div className='onboarding-container'>
      <h1 className='b-medium'>당신의 목표는 무엇인가요?</h1>
      <div style={{ marginTop: '30px' }}>
        <ButtonCommon
          variant={userData.diet_goal === 1 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(1)}
        >
          체중감량
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.diet_goal === 2 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(2)}
        >
          체중유지
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.diet_goal === 3 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(3)}
        >
          체중증량
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.diet_goal === 4 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(4)}
        >
          근육증량
        </ButtonCommon>
      </div>
    </div>
  );
};

export default OnboardingGoal;
