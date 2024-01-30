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
import useCachingApi from '@hooks/useCachingApi';

export interface userDataType {
  gender: number | null;
  birthDay: string;
  height: number | null;
  weight: number | null;
  diet_goal: number | null;
  activityAmount: number | null;
}

interface OnBoardingResult {
  data: string;
  status: number;
}

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

  const { loading, trigger } = useCachingApi<OnBoardingResult>({
    method: 'put',
    path: '/user',
  });

  const onNextClick = async () => {
    //onBoarding에 정보가 비어있는 경우 해당 화면으로 navigate....
    //api요청 보내지 않음
    //home으로 직접입력했을때? (auth)
    //
    if (currentStep === 6) {
      if (!loading) {
        trigger(
          { ...userData },
          {
            onSuccess: (data) => {
              if (
                data.data === '유저정보 및 유저건강정보 업데이트 성공' &&
                data.status === 200
              ) {
                navigate('/home');
              }
            },
          }
        );
      }
    } else {
      const nextStep = Math.min(6, currentStep + 1);
      navigate(`/onboarding/${nextStep}`);
    }
  };

  const onClickOnboarding = (onboardingInfo: object) => {
    setUserData((prev) => ({ ...prev, ...onboardingInfo }));
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
        return userData.height === '';
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
        {currentStep === 1 && (
          <OnboardingGender
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {currentStep === 2 && (
          <OnboardingBirth
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {currentStep === 3 && (
          <OnboardingHeight
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {currentStep === 4 && (
          <OnboardingWeight
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {currentStep === 5 && (
          <OnboardingGoal
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {currentStep === 6 && (
          <OnboardingActivity
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
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
