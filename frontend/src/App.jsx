import { useState, useEffect } from 'react'
import axios from 'axios'

function App() 
{
  const [postsData, setPostsData] = useState([])


  const endpoint = `${import.meta.env.VITE_API_URL}posts/`

  const fetchData = async() =>
  {
    console.log('fetching...')
    const response = await axios.get(endpoint)
    console.log(response)
    const {data} = response
    setPostsData(data)
    console.log(data)
    return data
  }

  const postData = async() =>
  {
    const name = 'test x'
    const description = 'test x description'
    const body = {name, description}

    const response = await axios.post(endpoint, body)
    console.log(response)
    return response.data
  }

  const handleSendData = async() => 
  {
    const newData = await postData()
    if (newData)
    {
      setPostsData(prevState => [...prevState, newData])
    }
    
  }

  useEffect(() =>
  {
    fetchData()
  }, [])

  return (
    <>
      <ul>
        {postsData.map(el => <li key={el.id}>{el.name}</li>)}
      </ul>
      <button onClick={handleSendData}>Create data</button>
    </>
  )
}

export default App
