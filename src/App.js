import React, { useState, useEffet } from "react";
import api from "./services/api";
import "./styles.css";



function App() {
   
  const [repositories, setRepositories] = useState([]);

 




  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "teste", 
      url: "testeURL", 
      techs: "tech"
    });

    const repositorio = response.data;

    setRepositories([... repositories, repositorio])

  }

  async function handleRemoveRepository(id) {

    console.log(id);
     await api.delete(`repositories/${id}`);
    
     const response = await api.get('repositories');

     const Getrepositorios = response.data;  

     setRepositories(Getrepositorios);

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
