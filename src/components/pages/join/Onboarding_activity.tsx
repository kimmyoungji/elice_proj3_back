import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import './Onboarding.css';

const Onboarding_activity = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const onClick = (goal: string) => {
    setSelectedActivity((prevActivity: string | null) => {
      return prevActivity === goal ? null : goal;
    });
  };

  return (
    <div>
      <h1 className="b-medium">당신의 평소 활동량은 어떤가요?</h1>
      <div style={{ marginTop: '30px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedActivity === 'activeHigh' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('activeHigh')}
        >
          매우 활동적
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedActivity === 'activeMid' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('activeMid')}
        >
          활동적
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedActivity === 'activeLow' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('activeLow')}
        >
          저활동적
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          className={`button large r-large ${selectedActivity === 'activeNone' ? 'default-active' : 'gray'}`}
          onClickBtn={() => onClick('activeNone')}
        >
          비활동적
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding_activity;