import axios from 'axios'

const scrapEndpoint = `${import.meta.env.VITE_API_URL}scrap/`
const favoriteEndpoint = `${import.meta.env.VITE_API_URL}favorite/`

export const fetchScrapData = async (name, setScrapData, setIsValidCode) => {
  try {
    console.log('fetching scrap data...')
    const response = await axios.post(scrapEndpoint, { name })
    console.log(response)

    if (response.data.error) {
      setScrapData(null) 
      setIsValidCode(false)  
    } else {
      setScrapData(response.data)  
      setIsValidCode(true) 
    }
  } catch (error) {
    console.error("Erro ao buscar dados do scraping:", error)
    setScrapData(null)  
    setIsValidCode(false)
  }
}

export const fetchFavoriteData = async (name, setFavoriteData) => {
  try {
    console.log('fetching favorite data...')
    const response = await axios.post(favoriteEndpoint, { name })
    console.log(response)
    setFavoriteData(response.data) 
  } catch (error) {
    console.error("Erro ao favoritar dados do scraping:", error)
  }
}
