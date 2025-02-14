import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [postsData, setPostsData] = useState([])
  const [scrapData, setScrapData] = useState(null) 

  const endpoint = `${import.meta.env.VITE_API_URL}posts/`
  const scrapEndpoint = `${import.meta.env.VITE_API_URL}api/scrap/` 

  
  const fetchData = async () => {
    console.log('fetching posts...')
    const response = await axios.get(endpoint)
    console.log(response)
    const { data } = response
    setPostsData(data)
    console.log(data)
    return data
  }

 
  const fetchScrapData = async (name) => {
    try {
      console.log('fetching scrap data...')
      const response = await axios.post(scrapEndpoint, { name })  
      console.log(response)
      setScrapData(response.data)  
    } catch (error) {
      console.error("Erro ao buscar dados do scraping:", error)
    }
  }

  const postData = async () => {
    const name = 'test x'
    const description = 'test x description'
    const body = { name, description }

    const response = await axios.post(endpoint, body)
    console.log(response)
    return response.data
  }

  const handleSendData = async () => {
    const newData = await postData()
    if (newData) {
      setPostsData((prevState) => [...prevState, newData])
    }
  }

  const handleScrapData = (name) => {
    fetchScrapData(name)  
  }

  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {postsData.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
      <button onClick={handleSendData}>Create data</button>

      <hr />
      
      <h2>Web Scraping</h2>
      <input
        type="text"
        placeholder="Enter name for scraping"
        onBlur={(e) => handleScrapData(e.target.value)} 
      />
      {scrapData && (
        <div>
          <h3>Scraping Result:</h3>
          <p>{scrapData}</p> 
        </div>
      )}
    </>
  )
}

export default App


/*
    import { useState, useEffect } from 'react';
    import axios from 'axios';

    function App() {
      const [scrapedData, setScrapedData] = useState("");  // Guardando apenas o texto
      const [inputValue, setInputValue] = useState("");  // Valor do input

      const scrapEndpoint = `${import.meta.env.VITE_API_URL}api/scrap/`;  // Endpoint para o scraping

      // Função para buscar os dados do scraping
      const fetchScrapData = async (name) => {
        try {
          const response = await axios.post(scrapEndpoint, { name });
          const { scraped_data } = response.data;  // Pegando o texto do scraping
          setScrapedData(scraped_data);  // Armazenando o texto
          console.log(scraped_data);  // Apenas para depuração
        } catch (error) {
          console.error("Erro ao buscar dados do scraping:", error);
          setScrapedData("Erro ao buscar os dados.");
        }
      };

      // Manipulando a mudança no campo de texto
      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

      const handleScrapData = () => {
        fetchScrapData(inputValue);  // Chama a função de scraping com o nome digitado
      };

      return (
        <div>
          <h1>Web Scraping Example</h1>
          <input 
            type="text" 
            value={inputValue}
            onChange={handleInputChange} 
            placeholder="Digite o código para scraping"
          />
          <button onClick={handleScrapData}>Obter Dados</button>
          
          
          {scrapedData && <p>{scrapedData}</p>}  

        </div>
      );
    }

    export default App;
*/