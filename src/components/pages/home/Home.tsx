import ButtonCommon from "../../UI/ButtonCommon";
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from "../../UI/Toggle";

const Home = () => {
  return (
    <div>
      Home <ButtonCommon className="button-big" />
      <Toggle onToggle={(on) => console.log(on)}>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
};

export default Home;
