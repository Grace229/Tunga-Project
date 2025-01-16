import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import '../App.css';
import AllPost from '../components/AllPost';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from '../redux/postSlice';
import { toast } from "react-toastify";
import customInstance from '../axios_http_client';

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts); // Get posts from Redux store
  const loading = useSelector((state) => state.post.loading); // Get loading state from Redux store

  useEffect(() => {
    const fetchData = async () => {
      if (posts.length === 0) { // Check if posts are empty
        dispatch(fetchPostsStart());
        try {
          const response = await customInstance.get('/post');
          const sortedPosts = response.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          ); 
          dispatch(fetchPostsSuccess(sortedPosts)); // Dispatch success action with fetched data
        } catch (err) {
          toast.error(err.response.data || "An error occurred");    
          dispatch(fetchPostsFailure('Error fetching posts'));
        }
      }
    };

    fetchData();
  }, [dispatch, posts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <svg
          className="w-24 h-24 animate-spin"
          fill="#1e40af"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AllPost posts={posts} />
    </>
  );
}

export default Home;
