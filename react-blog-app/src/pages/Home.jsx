import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import {toast} from "react-toastify"
import axios from "../utils/axiosInstance"

const Home = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage,setTotalPage] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [pageCount,setPageCount] = useState([])
  const [searchValue,setSearchValue] = useState("");
  const [posts,setPosts] = useState();

  useEffect(()=>{
    const getPosts = async () =>{
      try {
        setLoading(true);

        //api request
        const response = await axios.get(`/posts?pages=${currentPage}&q=${searchValue}`);
        const data = response.data.data;
        setPosts(data.posts)
        setTotalPage(data.pages)

        setLoading(false);
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message,{
          position:"top-right",
          autoClose:2000,
        })
        console.log(error.message)
      }

    }
    getPosts();
  },[currentPage])

  useEffect(()=>{
    if(totalPage>1)
    {
      let tempPageCount = [];
      for(let i=1;i<=totalPage;i++)
      {
        tempPageCount = [...tempPageCount,i]
      }

      setPageCount(tempPageCount)
    }else{
      setPageCount([]);
    }
  },[totalPage])

  const handlePrev = ()=>{
    setCurrentPage(currentPage-1)
    }

    const handlePage = (pageNumber) =>{
      setCurrentPage(pageNumber)
    }
    const handleNext = ()=>{
        setCurrentPage(currentPage+1);
    }


    const handleSearch = async (e)=>{
      try {
        const input = e.target.value;
        setSearchValue(input);
  
        const response = await axios.get(`/posts?q=${input}&page=${currentPage}`)
        const data = response.data.data;
        setPosts(data.posts)
        setTotalPage(data.pages)
      } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message,{
            position:"top-right",
            autoClose:2000,
          })
          console.log(error.message)
      }
    }
  

  
  
  return (

    <div>
     
      <h2 className="table-title">Post list</h2>

      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

<div className="flexbox-container wrap">
  {loading
    ? "Loading..."
    : posts && posts.length > 0 
      ? posts.map((post) => (
          <div
            className="post-card"
            key={post._id}
            onClick={() => navigate(`/posts/detail-post/${post._id}`)}
          >
            <h4 className="card-title">{post.title}</h4>
            <p className="card-desc">{post.desc.substring(0, 50)}</p>
          </div>
        ))
      : "No posts available."}
</div>


      {pageCount.length > 0 && (
        <div className="pag-container">
          <button
            className="pag-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pageCount.map((pageNumber, index) => (
            <button
              className="pag-button"
              key={index}
              onClick={() => handlePage(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pag-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      )}

{pageCount.length > 0 && (
      <div className="pag-container">
        <button
          className="pag-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          prev
        </button>
        {pageCount.map((pageNumber, index) => (
          <button
            className="pag-button"
            key={index}
            onClick={() => handlePage(pageNumber)}
            style={{
              backgroundColor: currentPage === pageNumber ? "#ccc" : "",
            }}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="pag-button"
          onClick={handleNext}
          disabled={currentPage === totalPage}
        >
          next
        </button>
      </div>
    )}

    </div>
  )
}

export default Home
