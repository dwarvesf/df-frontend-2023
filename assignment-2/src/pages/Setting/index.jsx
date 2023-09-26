//! imp Components
import ToggleButton from "../../components/Buttons/ToggleButton";
//! imp Store
import { useStore } from "../../store";

function Setting() {
  const { state, contextActions } = useStore();
  const { darkMode } = contextActions;

  const logState = (state) => {
    darkMode.toggle();
    console.log("state: ", state);
  };

  return (
    <div className="setting-screen">
      <div className="">
        <ToggleButton
          label="Dark/Light Mode"
          toggled={true}
          onClick={logState}
        />
      </div>
    </div>
  );
}

export default Setting;
