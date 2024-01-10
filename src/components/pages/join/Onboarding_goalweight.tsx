import { useEffect, useRef, useState } from "react";
import './Onboarding.css';
import NumericPad from "./NumericPad";

const Onboarding_goalweight = () => {
  const inputGoalWeight = useRef(null);

  return (
    <div>
      <h1 className="b-medium">당신의 목표 체중은 얼마인가요?</h1>
      <div style={{ marginTop: '130px', textAlign: 'center' }}>
        <input
          type="text"
          ref={inputGoalWeight}
          placeholder="99.9"
          className="b-super"
          style={{ width: '150px', textAlign: 'center', display: 'inline-block', border: 'none' }}
        />
        <span
          style={{ marginLeft: '5px', verticalAlign: 'top' }}
          className="b-super"
        >kg</span>
      </div>
      <div style={{ marginTop: '50px' }}>
        <NumericPad inputRef={inputGoalWeight} />
      </div>
    </div>
  );
};

export default Onboarding_goalweight;