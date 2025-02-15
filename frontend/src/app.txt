import { useState, useEffect } from 'react'
import { fetchScrapData, fetchFavoriteData } from './Api'

function App() {
  const [scrapData, setScrapData] = useState(null)
  const [favoriteData, setFavoriteData] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [isValidCode, setIsValidCode] = useState(true) 

  const handleScrapData = () => {
    fetchScrapData(inputValue, setScrapData, setIsValidCode) 
  }

  const handleFavoriteData = () => {
    if (scrapData) {
      fetchFavoriteData(inputValue, setFavoriteData) 
    } else {
      alert("Scrape needed.")
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
  }, [])

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

      {!isValidCode && <p style={{ color: 'red' }}>Invalid Code. Try Again.</p>}

      {scrapData && isValidCode && (
        <div>
          <h3>Scraping Result:</h3>
          <pre>{JSON.stringify(scrapData, null, 2)}</pre>
        </div>
      )}

  
    </>
  )
}

export default App
