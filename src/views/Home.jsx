import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../App.css'
import AllPost from '../components/AllPost'
import customInstance from '../axios_http_client';



function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customInstance.get('/post');
        console.log(response)
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
          console.log(err)
        alert('Error fetching data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  if (loading) {
    return <div className="flex justify-center items-center h-screen mt-10"><svg className='w-24 h-24 animate-spin' fill='#1e40af' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg></div>;
  }
  return (
    <>
        <Navbar />
        <AllPost posts={posts}/>
    </>
  )
}

export default Home
