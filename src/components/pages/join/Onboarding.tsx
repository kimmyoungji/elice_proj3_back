import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import Onboarding_gender from "./Onboarding_gender";
import Onboarding_birth from "./Onboarding_birth";
import Onboarding_height from "./Onboarding_height";
import Onboarding_weight from "./Onboarding_weight";
import Onboarding_goal from "./Onboarding_goal";
import Onboarding_activity from "./Onboarding_activity";

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = Number(step) || 1;

  const onBackClick = () => {
    const prevStep = currentStep - 1;
    navigate(`/onboarding/${prevStep}`);
  };

  const onNextClick = () => {
    if (currentStep === 6) {
      navigate('/home');
    } else {
      const nextStep = Math.min(6, currentStep + 1);
      navigate(`/onboarding/${nextStep}`);
    }
  };

  useEffect(() => {
    if (currentStep === 0) {
      navigate("/auth");
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="progress-bar" style={{ marginBottom: '50px' }}>{renderProgressBar()}</div>
        {currentStep === 1 && <Onboarding_gender />}
        {currentStep === 2 && <Onboarding_birth />}
        {currentStep === 3 && <Onboarding_height />}
        {currentStep === 4 && <Onboarding_weight />}
        {currentStep === 5 && <Onboarding_goal />}
        {currentStep === 6 && <Onboarding_activity />}
      </div>
      <div className='button-container'>
        <ButtonCommon
          variant="default-active"
          size="big"
          onClickBtn={onNextClick}
        >
          다음
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding;
