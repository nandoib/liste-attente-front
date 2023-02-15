import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/bg.png";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const adminLoginFetch = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/adminlogin", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          localStorage.setItem("tokenAdmin", result.tokenAdmin);
          localStorage.setItem("userId", result.userId);
          const remainingMilliseconds = 60 * 60 * 5000; // 5 heures
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          //on remout le component pour
          navigate(0);
        }
        if (!response.ok) {
          const result = await response.json();
          setError(result.message);
        }
      } catch (err) {
        console.log("erreur enregistrement");
      }
    };
    adminLoginFetch();
  };

  return (
    <>
      <div
        className="md:flex md:flex-wrap  md:items-center md:justify-center  md:h-screen md:py-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full md:w-5/12 md:border bg-white md:rounded-lg md:shadow-lg p-20">
          <p className="text-3xl text-center font-bold ">Admin Login</p>

          <div>
            <form className="space-y-6 mt-8" onSubmit={formSubmitHandler}>
              <div>
                <label
                  for="email"
                  className="mb-4 text-md font-bold text-gray-900 dark:text-white"
                >
                  Adresse mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                  placeholder="Exemple@exemple.fr"
                  required=""
                />
              </div>

              <div>
                <label
                  for="email"
                  className="mb-4 text-md font-bold text-gray-900 dark:text-white"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                  placeholder="**********"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-white hover:border-2 hover:border-green-600  focus:ring focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-green-600"
              >
                Enregistrer
              </button>
            </form>
            {error && (
              <div
                class="bg-red-100 rounded-lg py-5 px-6 mb-4 m-4  text-center text-base text-red-700 "
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
