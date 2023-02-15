import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PecForm = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [nSecu, setNSecu] = useState("");
  const [classe, setClasse] = useState("");
  const [nomEcole, setNomEcole] = useState("");
  const [ecoleVille, setEcoleVille] = useState("");
  const [difficulte, setDifficulte] = useState("");
  const [comprehension, setComprehension] = useState(true);
  const [expression, setExpression] = useState(true);
  const [rampage, setRampage] = useState(true);
  const [pattes, setPattes] = useState(true);
  const [autonome, setAutonome] = useState(true);
  const [lunettes, setLunettes] = useState(true);
  const [testOrl, setTestOrl] = useState(true);
  const [hyper, setHyper] = useState(true);
  const [agePas, setAgePas] = useState("");
  const [ageProprete, setAgeProprete] = useState("");
  const [repas, setRepas] = useState("");
  const [peurs, setPeurs] = useState("");
  const [activites, setActivites] = useState("");
  const [relations, setRelations] = useState("");
  const [suivi, setSuivi] = useState("");
  const [premiersMots, setPremiersMots] = useState("");
  const [error, setError] = useState("");
  const [sommeil, setSommeil] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const fetchPostForm = async () => {
      try {
        const response = await fetch(
          "https://liste-attente-back.vercel.app/submitForm/" + userId,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              activites: activites,
              agePremierMots: premiersMots,
              agePremierPas: agePas,
              ageProprete: ageProprete,
              autonome: autonome,
              classe: classe,
              comprehension: comprehension,
              difficultes: difficulte,
              ecole: nomEcole,
              ecoleVille: ecoleVille,
              expression: expression,
              hyper: hyper,
              lunettes: lunettes,
              numeroSecu: nSecu,
              pattes: pattes,
              peurs: peurs,
              rampage: rampage,
              relations: relations,
              repas: repas,
              sommeil: sommeil,
              suivis: suivi,
              testOrl: testOrl,
            }),
          }
        );

        if (response.ok) {
          navigate("/");
        }
      } catch (err) {
        setError("Erreur");
      }
    };

    fetchPostForm();
  };

  return (
    <>
      <div className="grid">
        <form
          className="space-y-2 md:space-y-6 p-28 "
          onSubmit={formSubmitHandler}
        >
          <div className="md:grid  md:grid-cols-2">
            <div className=" md:mr-4">
              <label
                for="Secu"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Numero sécurité sociale
              </label>
              <input
                type="number"
                value={nSecu}
                onChange={(e) => {
                  setNSecu(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm "
                placeholder="N° à 13 chiffres"
                required
              />
            </div>

            <div className="">
              <label
                for="nom"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Classe de l'enfant
              </label>
              <input
                type="text"
                value={classe}
                onChange={(e) => {
                  setClasse(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5  text-sm"
                placeholder="CE1"
              />
            </div>
          </div>

          <div className="md:grid md:grid-cols-2">
            <div className="md:mr-4">
              <label
                for="prenom"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Nom de l'école
              </label>

              <input
                type="text"
                minlength="3"
                value={nomEcole}
                onChange={(e) => {
                  setNomEcole(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm  "
                placeholder="École Alain"
              />
            </div>

            <div className="">
              <label
                for="ville"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Ville de l'école
              </label>
              <input
                type="text"
                minlength="3"
                value={ecoleVille}
                onChange={(e) => {
                  setEcoleVille(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
                placeholder="Sarreguemines"
                required
              />
            </div>
          </div>

          <div className="">
            <label
              for="difficulté"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Difficulté rencontré par l'enfant (école et maison)
            </label>
            <textarea
              type="text"
              rows="4"
              value={difficulte}
              onChange={(e) => {
                setDifficulte(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <div className="">
            <label
              for="suivis"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Autres suivis médicaux et paramédicaux
            </label>
            <textarea
              type="text"
              rows="3"
              value={suivi}
              onChange={(e) => {
                setSuivi(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm "
            />
          </div>

          <div className="">
            <label
              for="age premier mots"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Age des premiers mots
            </label>
            <input
              type="text"
              value={premiersMots}
              onChange={(e) => {
                setPremiersMots(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <p className="block font-bold text-sm">
            L'enfant comprend bien ce qu'on lui dit ? Oublie t-il les consignes
            ou une partie de la consigne ?{" "}
          </p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4 ">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={comprehension}
                checked={comprehension}
                onChange={(e) => {
                  setComprehension(!comprehension);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!comprehension}
                checked={!comprehension}
                onChange={(e) => {
                  setComprehension(!comprehension);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <p className="font-bold text-sm">L'enfant s'exprime beaucoup ?</p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={expression}
                checked={expression}
                onChange={(e) => {
                  setExpression(!expression);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!expression}
                checked={!expression}
                onChange={(e) => {
                  setExpression(!expression);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <p className="font-bold text-sm">L'enfant a-t-il rampé ? </p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={rampage}
                checked={rampage}
                onChange={(e) => {
                  setRampage(!rampage);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!rampage}
                checked={!rampage}
                onChange={(e) => {
                  setRampage(!rampage);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <p className="font-bold text-sm">L'enfant a-t-il fait du 4 Pattes</p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={pattes}
                checked={pattes}
                onChange={(e) => {
                  setPattes(!pattes);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!pattes}
                checked={!pattes}
                onChange={(e) => {
                  setPattes(!pattes);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <div className="">
            <label className="mb-4 text-sm font-bold text-gray-900 dark:text-white ">
              Age des premiers pas
            </label>
            <input
              type="text"
              value={agePas}
              onChange={(e) => {
                setAgePas(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <p className="font-bold text-sm">
            L'enfant est-il autonome au quotidien (habillage,lacets,tenue des
            couverts ...)
          </p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={autonome}
                checked={autonome}
                onChange={(e) => {
                  setAutonome(!autonome);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!autonome}
                checked={!autonome}
                onChange={(e) => {
                  setAutonome(!autonome);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <p className="font-bold text-sm">Port de lunettes ? </p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={lunettes}
                checked={lunettes}
                onChange={(e) => {
                  setLunettes(!lunettes);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!lunettes}
                checked={!lunettes}
                onChange={(e) => {
                  setLunettes(!lunettes);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <p className="font-bold text-sm">Test Orl réalisé ?</p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={testOrl}
                checked={testOrl}
                onChange={(e) => {
                  setTestOrl(!testOrl);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!testOrl}
                checked={!testOrl}
                onChange={(e) => {
                  setTestOrl(!testOrl);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <p className="font-bold text-sm">
            L’enfant a-t-il une hypersensibilité sensorielle (visuelle,
            auditive, tactile, gustative/olfactive...) ?
          </p>
          <div className="flex flex-wrap">
            <div class="form-check mx-4">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={hyper}
                checked={hyper}
                onChange={(e) => {
                  setHyper(!hyper);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
              >
                Oui
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={!hyper}
                checked={!hyper}
                onChange={(e) => {
                  setHyper(!hyper);
                }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckChecked"
              >
                Non
              </label>
            </div>
          </div>

          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Age d'acquisition de la propreté ?
            </label>
            <input
              type="text"
              value={ageProprete}
              onChange={(e) => {
                setAgeProprete(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Comment se passent les repas ?
            </label>
            <textarea
              type="text"
              value={repas}
              onChange={(e) => {
                setRepas(e.target.value);
              }}
              rows="3"
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Comment se passe le temps du sommeil ?
            </label>
            <textarea
              type="text"
              value={sommeil}
              rows="3"
              onChange={(e) => {
                setSommeil(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              L'enfant à t-il des peurs ?
            </label>
            <textarea
              type="text"
              value={peurs}
              rows="3"
              onChange={(e) => {
                setPeurs(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Activité extra-scolaire / activités favorites
            </label>
            <textarea
              type="text"
              rows="3"
              value={activites}
              onChange={(e) => {
                setActivites(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Comment se passent les relations avec les autres ?
            </label>
            <textarea
              type="text"
              rows="3"
              value={relations}
              onChange={(e) => {
                setRelations(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-white hover:border-2 hover:border-blue-700  focus:ring focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-blue-700"
          >
            Valider
          </button>

          {error && (
            <div
              class="bg-red-100 rounded-lg py-5 px-6 mb-4 m-2 text-center text-base text-red-700 "
              role="alert"
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default PecForm;
