import { useEffect, useState } from "react";
import NewPatientForm from "./components/NewPatientForm";
import NewAdmin from "./components/NewAdmin";
import AdminLoginForm from "./components/AdminLoginForm";
import AdminPage from "./components/AdminPage";
import PatientLoginForm from "./components/PatientLoginForm";
import PatientPage from "./components/PatientPage";
import { Routes, Redirect, Route } from "react-router-dom";
import Home from "./components/Home";
import PecForm from "./components/PecForm";

function App() {
  const [isAuth, setIsAuth] = useState({ logged: false, role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      console.log("no token");
    }
    if (new Date(expiryDate) <= new Date()) {
      console.log("expired token");
    } else {
      if (tokenAdmin) {
        setIsAuth({ logged: true, role: "admin" });
        console.log("admin logged");
      }
      if (token) {
        setIsAuth({ logged: true, role: "patient" });
        console.log("Patient Logged");
      }
    }
  }, []);

  console.log(isAuth);
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            isAuth.logged && isAuth.role == "patient" ? (
              <PatientPage />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/admin"
          exact
          element={
            isAuth.logged && isAuth.role == "admin" ? (
              <AdminPage />
            ) : (
              <AdminLoginForm />
            )
          }
        />

        <Route
          path="/questionnaire"
          exact
          element={
            isAuth.logged && isAuth.role == "patient" ? <PecForm /> : <Home />
          }
        />
      </Routes>
    </>
  );
}

export default App;
