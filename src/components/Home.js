import { useState } from "react";
import NewPatientForm from "./NewPatientForm";
import PatientLoginForm from "./PatientLoginForm";

const Home = () => {
  const [logOrRegister, setLogOrRegister] = useState("log");
  return (
    <>
      <button
        className="bg-blue-500 p-2 border rounded-lg"
        onClick={(e) => {
          setLogOrRegister("log");
        }}
      >
        J'ai un compte
      </button>
      <button
        className="bg-blue-500 p-2 border rounded-lg"
        onClick={(e) => {
          setLogOrRegister("register");
        }}
      >
        Je m'inscris
      </button>

      {logOrRegister == "log" && <PatientLoginForm />}
      {logOrRegister == "register" && <NewPatientForm />}
    </>
  );
};

export default Home;
