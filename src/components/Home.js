import { useState } from "react";
import NewPatientForm from "./NewPatientForm";
import PatientLoginForm from "./PatientLoginForm";
import NewPatientPage from "./NewPatientPage";
import NewAdmin from "./NewAdmin";

const Home = () => {
  const [showLog, setShowLog] = useState(true);

  const changeLogOrRegister = () => {
    setShowLog(!showLog);
  };
  return (
    <>
      {showLog && (
        <PatientLoginForm
          registerOrLog={showLog}
          changeLogShow={changeLogOrRegister}
        />
      )}
      {!showLog && (
        <NewPatientPage
          registerOrLog={showLog}
          changeLogShow={changeLogOrRegister}
        />
      )}
    </>
  );
};

export default Home;
