import { useEffect, useRef, useState } from 'react';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '@components/UI/InputCommon';
import {
  Toggle,
  ToggleOn,
  ToggleOff,
  ToggleButton,
} from '@components/UI/Toggle';

const Home = () => {
  const [state, setState] = useState(0);

  const onClick = () => {
    console.log('btn is clicked!');
    setState((prev) => prev + 1);
  };
  return (
    <div>
      Home
      <ButtonCommon
        className='button large r-large default'
        onClickBtn={onClick}
      >
        {state}
      </ButtonCommon>
      Home <ButtonCommon className='button-large-green'>Button</ButtonCommon>
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
