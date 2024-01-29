import React, { useEffect, useState } from 'react';
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

const OnboardingActivity: React.FC<OnboardingGoalProps> = ({ data }) => {
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const onClick = (activityAmount: number) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      activityAmount: prevUserData.activityAmount === activityAmount ? null : activityAmount,
    }));
  };

  return (
    <div className='onboarding-container'>
      <h1 className='b-medium'>당신의 평소 활동량은 어떤가요?</h1>
      <div style={{ marginTop: '30px' }}>
        <ButtonCommon
          variant={userData.activityAmount === 1 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(1)}
        >
          매우 활동적
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.activityAmount === 2 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(2)}
        >
          활동적
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.activityAmount === 3 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(3)}
        >
          저활동적
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          variant={userData.activityAmount === 4 ? 'active' : 'default'}
          size='large'
          onClickBtn={() => onClick(4)}
        >
          비활동적
        </ButtonCommon>
      </div>
    </div>
  );
};

export default OnboardingActivity;
