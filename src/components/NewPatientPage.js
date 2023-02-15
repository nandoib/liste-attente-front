import NewPatientForm from "./NewPatientForm";
import Background from "./Background";

const NewPatientPage = (props) => {
  const changeLogOrRegister = () => {
    props.changeLogShow();
  };
  return (
    <>
      <Background>
        <NewPatientForm
          registerOrLog={props.showLog}
          changeLogShow={changeLogOrRegister}
        />
      </Background>
    </>
  );
};

export default NewPatientPage;
