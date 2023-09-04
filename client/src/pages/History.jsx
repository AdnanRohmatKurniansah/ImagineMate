import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { deleteHistory, history } from '../libs/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function History() {
  const [loading, setIsLoading] = useState(true)
  const [allHistory, setAllHistory] = useState([])
  const [paginate, setPaginate] = useState([])
  const [counter, setCounter] = useState(1)

  const alert = (message, type) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(() => {
    loadHistory(counter)
  }, [counter])

  const loadHistory = async (page) => {
    setIsLoading(true)
    const response = await history(page)
    setIsLoading(false)
    if (response.data) {
      setAllHistory(response.data.data)
      setPaginate(response.data)
    } else {
      console.log(response.response.data.message)
    }
  }
  
  const prev = () => {
    setCounter(counter <= 1 ? 1 : counter - 1)
    console.log(counter)
  }

  const totalPage = Math.ceil(paginate.total_data / paginate.per_page)

  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1)
    console.log(counter)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Remove this image?')

    if (confirmed) {
      const response = await deleteHistory(id)
      if (response.data) {
        setAllHistory((prevHistory) => prevHistory.filter(list => list._id !== id))
        alert(response.data.message, 'success');
      } else {
        alert(response.response.data.message, 'error');
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-5 md:container md:mx-auto md:px-48 mt-10 mb-10">
        <h1 className='font-semibold text-3xl'>History</h1>
        <div className='mt-10 mb-20'>
        {
          loading ? (
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-full border-2 rounded-md mx-auto card">
                    <div className="flex animate-pulse bg-gray-300 flex-row items-center w-full h-[400px] md:h-full rounded-md justify-center space-x-5">
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <>
                {
                  allHistory.length > 0 ? (
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                      {
                        allHistory.map((list, i) => (
                          <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card" key={i}>
                            <img className="w-full h-auto object-cover rounded-xl" src={list.photo} />
                            <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] m-2 p-4 rounded-md">
                              <p className="text-white text-sm overflow-y-auto uppercase">{list.prompt}</p>
                              <div className="mt-5 flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full object-cover bg-blue-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                                  <p className="text-white text-sm">{list.username}</p>
                                </div>
                                <div className="">
                                <a href={list.photo} download={`image_${i}.jpg`} className="outline-none text-white mr-3 bg-transparent border-none">
                                  <i className="fa-solid fa-download"></i>
                                </a>
                                <button className="outline-none text-white bg-transparent border-none" onClick={() => handleDelete(list._id)}>
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center my-48 items-center">
                      <h1 className='text-2xl font-semibold md:w-full'>You haven't published any pictures at all</h1>
                      <Link className='btn btn-sm btn-neutral text-white mt-8'>Create new image</Link>
                    </div>
                  )
                }
            </>
          )
        }
        </div>
        {
          paginate.total_data > paginate.per_page && (
            <div className="join container mx-auto justify-center mb-16">
              <button className="join-item btn" onClick={prev}>«</button>
              <button className="join-item btn">{paginate.current_page} - {totalPage}</button>
              <button className="join-item btn" onClick={next}>»</button>
            </div>
          )
        }
      </div>
      <Footer />
    </>
  )
}
