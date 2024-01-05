import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from "../../UI/Toggle";

const Home = () => {
  const [state, setState] = useState(0);

  const onClick = () => {
    console.log("btn is clicked!");
    setState((prev) => prev + 1);
  };
  return (
    <div>
      Home
      <ButtonCommon className="button-large-white" onClickBtn={onClick}>
        {state}
      </ButtonCommon>
      Home <ButtonCommon className="button-large-green">Button</ButtonCommon>
      <InputCommon
        value={state}
        // placeholder="안뇽"
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   setState(e.target.value)
        // }
      />
    </div>
  );
};

export default Home;
