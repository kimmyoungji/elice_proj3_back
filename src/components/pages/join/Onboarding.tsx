import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonCommon from '../../UI/ButtonCommon';
import OnboardingGender from './OnboardingGender';
import OnboardingBirth from './OnboardingBirth';
import OnboardingHeight from './OnboardingHeight';
import OnboardingWeight from './OnboardingWeight';
import OnboardingGoal from './OnboardingGoal';
import OnboardingActivity from './OnboardingActivity';
import useApi from '@hooks/useApi';

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = Number(step) || 1;

  const [userData, setUserData] = useState({
    gender: null,
    birthDay: '',
    height: null,
    weight: null,
    diet_goal: null,
    activityAmount: null,
  });

  const { loading, trigger } = useApi({
    method: 'post',
    path: '/use',
    data: { body: userData },
  });

  const onBackClick = () => {
    const prevStep = currentStep - 1;
    navigate(`/onboarding/${prevStep}`);
  };

  const onNextClick = async () => {
    if (currentStep === 6) {
      if (!loading) {
        await trigger({});
        // navigate('/home');
      }
    } else {
      const nextStep = Math.min(6, currentStep + 1);
      navigate(`/onboarding/${nextStep}`);
    }
  };

  const isNextButtonDisabled = () => {
    switch (currentStep) {
      case 1:
        return userData.gender === null;
      case 2:
        return (
          userData.birthDay === null ||
          userData.birthDay.split('-').some((part) => part === '')
        );
      case 3:
        return userData.height === null;
      case 4:
        return userData.weight === null;
      case 5:
        return userData.diet_goal === null;
      case 6:
        return userData.activityAmount === null;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (currentStep === 0) {
      navigate('/auth');
    }
    console.log(currentStep);
  }, [currentStep, navigate]);

  const renderProgressBar = () => {
    const steps = 6;
    const progressBarSteps = [];

    for (let i = 1; i <= steps; i++) {
      const isActive = i <= currentStep;
      progressBarSteps.push(
        <div key={i} className={`progress-step ${isActive ? 'active' : ''}`} />
      );
    }

    return progressBarSteps;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div className='progress-bar' style={{ marginBottom: '50px' }}>
          {renderProgressBar()}
        </div>
        {/* {currentStep === 1 && <Onboarding_gender />}
        {currentStep === 2 && <Onboarding_birth />}
        {currentStep === 3 && <Onboarding_height />}
        {currentStep === 4 && <Onboarding_weight />}
        {currentStep === 5 && <Onboarding_goal />}
        {currentStep === 6 && <Onboarding_activity />} */}
        {currentStep === 1 && <OnboardingGender data={userData} />}
        {currentStep === 2 && <OnboardingBirth data={userData} />}
        {currentStep === 3 && <OnboardingHeight data={userData} />}
        {currentStep === 4 && <OnboardingWeight data={userData} />}
        {currentStep === 5 && <OnboardingGoal data={userData} />}
        {currentStep === 6 && <OnboardingActivity data={userData} />}
      </div>
      <div className='button-container'>
        <ButtonCommon
          variant='default-active'
          size='big'
          onClickBtn={onNextClick}
          disabled={isNextButtonDisabled()}
        >
          다음
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding;
