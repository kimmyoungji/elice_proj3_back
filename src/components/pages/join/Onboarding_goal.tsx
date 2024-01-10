import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import './Onboarding.css';

const Onboarding_goal = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const onClick = (goal: string) => {
    setSelectedGoal((prevGoal: string | null) => {
      return prevGoal === goal ? null : goal;
    });
  };

  return (
    <div>
      <h1 className="b-medium">당신의 목표는 무엇인가요?</h1>
      <div style={{ marginTop: '30px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedGoal === 'looseWeight' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('looseWeight')}
        >
          체중감량
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedGoal === 'maintainWeight' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('maintainWeight')}
        >
          체중유지
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedGoal === 'gainWeight' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('gainWeight')}
        >
          체중증량
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedGoal === 'gainMuscle' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('gainMuscle')}
        >
          근육증량
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding_goal;