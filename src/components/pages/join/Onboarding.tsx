import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from '@components/UI/InputCommon';
import './Onboarding.css';
import Onboarding_gender from "./Onboarding_gender";
import Onboarding_birth from "./Onboarding_birth";
import Onboarding_height from "./Onboarding_height";
import Onboarding_weight from "./Onboarding_weight";
import Onboarding_goal from "./Onboarding_goal";
import Onboarding_goalweight from "./Onboarding_goalweight";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const onBackClick = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onNextClick = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 6) {
        navigate('/join/onboarding-join');
        return prevStep;
      } else {
        return Math.min(6, prevStep + 1);
      }
    });
  };

  useEffect(() => {
    if (currentStep === 0) {
      navigate("/join");
    }
    console.log(currentStep);
  }, [currentStep, navigate]);


  const renderProgressBar = () => {
    const steps = 6;
    const progressBarSteps = [];

    for (let i = 1; i <= steps; i++) {
      const isActive = i === currentStep;
      progressBarSteps.push(
        <div
          key={i}
          className={`progress-step ${isActive ? 'active' : ''}`}
        />
      );
    }

    return progressBarSteps;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{ marginLeft: '25px', marginTop: '30px', marginBottom: '30px', cursor: 'pointer', fontSize: '14px' }}
          onClick={onBackClick}
        >
          back
        </div>
      </div>
      <div className="progress-bar" style={{ marginBottom: '50px' }}>{renderProgressBar()}</div>
      {currentStep === 1 && <Onboarding_gender />}
      {currentStep === 2 && <Onboarding_birth />}
      {currentStep === 3 && <Onboarding_height />}
      {currentStep === 4 && <Onboarding_weight />}
      {currentStep === 5 && <Onboarding_goal />}
      {currentStep === 6 && <Onboarding_goalweight />}
      <div style={{ marginTop: '330px' }}>
        <ButtonCommon
          className='button big b-small blue'
          onClickBtn={onNextClick}
        >
          다음
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding;