import { useGlobalClearALL } from "src/components/GlobalSave";
import { storge } from "src/utils";

const Logout = () => {
  storge.clearAllStorge();
  useGlobalClearALL();

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <h2>SEE YOU AGAIN!</h2>
    </div>
  );
};

export default Logout;
