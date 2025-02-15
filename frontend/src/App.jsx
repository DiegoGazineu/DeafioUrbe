import { useState, useEffect } from 'react';
import { fetchScrapData, fetchFavoriteData } from './Api';

function App() {
  const [scrapData, setScrapData] = useState(null);
  const [favoriteData, setFavoriteData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);

  const handleScrapData = () => {
    fetchScrapData(inputValue, setScrapData, setIsValidCode);
  };

  const handleFavoriteData = () => {
    if (scrapData) {
      fetchFavoriteData(inputValue, setFavoriteData);
    } else {
      alert("Você precisa realizar o scraping antes de favoritar.");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // Pode ser usada uma função de inicialização, caso necessário.
  }, []);

  // Função para formatar os dados do scraping
  const formatScrapData = (data) => {
    return data.map((item, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <strong>{item.description}:</strong> <span>{item.value}</span>
      </div>
    ));
  };

  return (
    <>
      <h2>Web Scraping</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter name for scraping"
      />
      <button onClick={handleScrapData}>Scrape Data</button>

      {scrapData && isValidCode && (
        <button onClick={handleFavoriteData}>Favorite Scraped Data</button>
      )}

      {!isValidCode && <p style={{ color: 'red' }}>Código inválido. Tente novamente.</p>}

      {scrapData && isValidCode && (
        <div>
          <h3>Scraping Result:</h3>
          <div>{formatScrapData(scrapData)}</div>
        </div>
      )}

    </>
  );
}

export default App;
