import React, { useState, useEffet } from "react";
import api from "./services/api";



import "./styles.css";

function App() {
   
  const [repositories, setRepositoies] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "teste", 
      url: "testeURL", 
      techs: "tech"
    });

    const repositorio = response.data;

    setRepositoies([... repositories, repositorio])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const response = await api.get('repositories');

    const repositorio = response.data;

    setRepositoies([... repositories, repositorio]);

  }

  return (
    <div>
      <ul data-testid="repository-list">        
        {repositories.map(repo => <li key={repo.id}>{repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
