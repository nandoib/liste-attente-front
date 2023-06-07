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
    { id: 2, prenom: "Nando", nom: "Ibba" },
  ];

  const columns = ["prenom", "nom"];

  // Filtrer les éléments en fonction du terme de recherche
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <tr>{columns.map((column) => column)}</tr>
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

      <ul className="pagination">
        {filteredData.map((item, index) => (
          <li key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
