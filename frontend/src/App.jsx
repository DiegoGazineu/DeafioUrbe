import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [postsData, setPostsData] = useState([])  
  const [scrapData, setScrapData] = useState(null)  
  const [inputValue, setInputValue] = useState("")  

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

  const handleScrapData = () => {
    fetchScrapData(inputValue) 
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
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
        value={inputValue}
        onChange={handleInputChange} 
        placeholder="Enter name for scraping"
      />
      <button onClick={handleScrapData}>Fetch Scraped Data</button>
      
      {scrapData && (
        <div>
          <h3>Scraping Result:</h3>
          <pre>{JSON.stringify(scrapData, null, 2)}</pre>
        </div>
      )}
    </>
  )
}

export default App
