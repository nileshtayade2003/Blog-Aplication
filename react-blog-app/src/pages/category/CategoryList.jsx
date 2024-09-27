import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {toast} from "react-toastify"
import axios from "../../utils/axiosInstance"
import moment from "moment/moment"
import {Modal , Button} from 'react-bootstrap'



const CategoryList = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage,setTotalPage] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [pageCount,setPageCount] = useState([])
  const [searchValue,setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoryId,setCategoryId] = useState(null);


  useEffect(()=>{
    const getCategories = async () =>{
      try {
        setLoading(true);

        //api request
        const response = await axios.get(`/category?pages=${currentPage}&q=${searchValue}`);
        const data = response.data.data;
        setCategories(data.categories)
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
    getCategories();
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

      const response = await axios.get(`/category?q=${input}&page=${currentPage}`)
      const data = response.data.data;
      setCategories(data.categories)
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

  const handleDelete = async ()=>{
    try {
      const response = await axios.delete(`/category/${categoryId}`);

      setShowModal(false);

      toast.success(data.message,{
        position:"top-right",
        autoClose:2000,
      })

       //api request
       const response2 = await axios.get(`/category?pages=${currentPage}&q=${searchValue}`);
       const data2 = response2.data.data;
       setCategories(data2.categories)
       setTotalPage(data2.pages)
    } catch (error) {
      setShowModal(false)
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
    <button
      className="button button-block"
      onClick={() => navigate("new-category")}
    >
      Add New Category
    </button>
    <h2 className="table-title">Category list</h2>
    <input
      className="saerch-input"
      type="text"
      name="search"
      placeholder="Search here"
      onChange={handleSearch}
    />
    {loading ? (
      "Loading..."
    ) : (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.title}</td>
              <td>{category.desc}</td>
              <td>
                {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td>
                {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <th>
                <button
                  className="button"
                  onClick={() => navigate(`update-category/${category._id}`)}
                >
                  Update
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setShowModal(true);
                    setCategoryId(category._id);
                  }}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
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

    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setCategoryId(null);
      }}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <div style={{ margin: "0 auto" }}>
          <Button
            className="no-button"
            onClick={() => {
              setShowModal(false);
              setCategoryId(null);
            }}
          >
            No
          </Button>
          <Button className="yes-button" onClick={handleDelete}
          >
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default CategoryList
