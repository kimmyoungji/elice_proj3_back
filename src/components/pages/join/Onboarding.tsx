import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import './Onboarding.css';
import Onboarding_gender from "./Onboarding_gender";
import Onboarding_birth from "./Onboarding_birth";
import Onboarding_height from "./Onboarding_height";
import Onboarding_weight from "./Onboarding_weight";
import Onboarding_goal from "./Onboarding_goal";
import Onboarding_goalweight from "./Onboarding_goalweight";
import Onboarding_activity from "./Onboarding_activity";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(Number(localStorage.getItem('currentStep')) || 1);

  const onBackClick = () => {
    const prevStep = currentStep - 1
    setCurrentStep(prevStep);
    localStorage.setItem('currenStep', prevStep.toString());
  };

  const onNextClick = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 7) {
        navigate('/join/onboarding-join');
        return prevStep;
      } else {
        const nextStep = Math.min(7, prevStep + 1);
        localStorage.setItem('currentStep', nextStep.toString());
        return nextStep;
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
    const steps = 7;
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        {currentStep === 7 && <Onboarding_activity />}
      </div>
      <div className='button-container'>
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