import React, { useState } from "react";

const Table = () => {
  //Props a passer :
  //Data une liste d'objets avec toutes les données
  //columns, une liste de tout les index du tableau

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 1;

  // Supposons que vous ayez un tableau de données
  const data = [
    { id: 1, prenom: "Nando", nom: "Ibba" },
    { id: 2, prenom: "Priscille", nom: "Ibba" },
  ];

  const columns = ["prenom", "nom"];

  // Filtrer les éléments en fonction du terme de recherche
  const filteredData = data.filter((item) =>
    item.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculez l'index de début et de fin des éléments actuels
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gérer les changements de terme de recherche
  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.prenom}</td>
              <td>{item.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mx-2">
        {filteredData.map((item, index) => (
          <li
            className="p-1 border border-black mx-2"
            key={index}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Table;
