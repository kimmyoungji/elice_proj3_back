import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonCommon from '../../UI/ButtonCommon';
import OnboardingGender from './OnboardingGender';
import OnboardingBirth from './OnboardingBirth';
import OnboardingHeight from './OnboardingHeight';
import OnboardingWeight from './OnboardingWeight';
import OnboardingGoal from './OnboardingGoal';
import OnboardingActivity from './OnboardingActivity';
import useCachingApi from '@hooks/useCachingApi';
import { checkValuesNullOrEmpty } from '@utils/checkValuesNullOrEmpty';
import { useSelector } from 'react-redux';
import { RootState } from '@components/store';
import { UserInfo } from '@components/store/userLoginRouter';

export interface userPutDataType {
  dietGoal?: string;
  activityAmount?: string;
  height?: number;
  weight?: number;
  gender?: string;
  birthDay?: string;
}

interface OnBoardingResult {
  data: string;
  status: number;
}

const initialUserInfo = {
  activityAmount: undefined,
  dietGoal: '',
  username: '',
  height: undefined,
  gender: undefined,
  birthDay: '',
  weight: undefined,
};

//onboarding에서 앞의 데이터가 없을 때

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();
  const [curStep, setCurStep] = useState(Number(step) || 1);
  const [userData, setUserData] = useState<userPutDataType>(initialUserInfo);

  const returnedUserData = useSelector(
    (state: RootState) => state.user.userInfo
  );
  const { loading, trigger } = useCachingApi<OnBoardingResult>({
    method: 'put',
    path: '/user',
  });
  const changeTypedUserData: UserInfo = Object.assign({}, returnedUserData, {
    activityAmount:
      returnedUserData.activityAmount &&
      returnedUserData.activityAmount.toString(),
    dietGoal: returnedUserData.dietGoal,
    username: returnedUserData.username,
    height: returnedUserData.height,
    gender: returnedUserData.gender,
    birthDay: '',
    weight: returnedUserData.weight,
  });

  useEffect(() => {
    setUserData(changeTypedUserData);
  }, [returnedUserData]);

  const onNextClick = async () => {
    if (curStep === 6) {
      if (checkValuesNullOrEmpty(userData)) {
        setCurStep(checkValuesNullOrEmpty(userData) as number);
        return navigate(`/onboarding/${checkValuesNullOrEmpty(userData)}`);
      } else if (!loading) {
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
      setCurStep((prev) => prev + 1);
      navigate(`/onboarding/${curStep + 1}`);
    }
  };

  const onClickOnboarding = (onboardingInfo: object) => {
    setUserData((prev) => ({ ...prev, ...onboardingInfo }));
  };

  const isNextButtonDisabled = () => {
    switch (curStep) {
      case 1:
        return userData.gender === '';
      case 2:
        return userData.birthDay === '';
      case 3:
        return userData.height?.toString() === '';
      case 4:
        return userData.weight?.toString() === '';
      case 5:
        return userData.dietGoal === '';
      case 6:
        return userData.activityAmount === '';
      default:
        return true;
    }
  };

  const renderProgressBar = () => {
    const steps = 6;
    const progressBarSteps = [];

    for (let i = 1; i <= steps; i++) {
      const isActive = i <= curStep;
      progressBarSteps.push(
        <div key={i} className={`progress-step ${isActive ? 'active' : ''}`} />
      );
    }

    return progressBarSteps;
  };

  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div className='progress-bar' style={{ marginBottom: '50px' }}>
          {renderProgressBar()}
        </div>
        {curStep === 1 && (
          <OnboardingGender
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {curStep === 2 && (
          <OnboardingBirth
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {curStep === 3 && (
          <OnboardingHeight
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {curStep === 4 && (
          <OnboardingWeight
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {curStep === 5 && (
          <OnboardingGoal
            userData={userData}
            onClickOnboarding={onClickOnboarding}
          />
        )}
        {curStep === 6 && (
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
