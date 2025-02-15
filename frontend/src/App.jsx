import { useEffect, useState } from "react";
import axios from 'axios';
import { fetchScrapData, fetchFavoriteData } from './Api';

function App() {
  const [productsData, setProductsData] = useState([]);
  const [scrapData, setScrapData] = useState(null);
  const [favoriteData, setFavoriteData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const endpoint = `${import.meta.env.VITE_API_URL}favorites/`;

  const fetchData = async () => {
    console.log('fetching...');
    const response = await axios.get(endpoint);
    console.log(response);
    const { data } = response;
    setProductsData(data);
    console.log(data);
    return data;
  };

  const handleScrapData = () => {
    fetchScrapData(inputValue, setScrapData, setIsValidCode);
  };

  const handleFavoriteData = async () => {
    if (scrapData) {
      const formattedScrapData = {
        code: inputValue,
        items: scrapData.items.map(item => ({
          description: item.description,
          value: item.value
        }))
      };

      await fetchFavoriteData(inputValue, formattedScrapData);

      setRefresh(prevState => !prevState);
      setInputValue('');
    } else {
      alert("Scrape needed.");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <>
      <h2>Favorites</h2>
      <div>
        {productsData.map((product) => (
          <div key={product.code}>
            <h3>{product.code}</h3>
            <ul>
              {product.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.description}:</strong> {item.value} ({item.category})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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

      {!isValidCode && <p style={{ color: 'red' }}>Invalid Code. Try Again.</p>}

      {scrapData && isValidCode && (
        <div>
          <h3>Scraping Result:</h3>
            <ul>
              {scrapData.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.description}:</strong> {item.value}
                </li>
              ))}
            </ul>
        </div>
      )}
    </>
  );
}

export default App;
