import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { lists } from '../libs/api'

export default function Home() {
  const [loading, setIsLoading] = useState(false)
  const [allList, setList] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [paginate, setPaginate] = useState([])
  const [counter, setCounter] = useState(1)
  const [searchResult, setSearchResult] = useState(null)
  
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      axios.defaults.headers.common['Authorization'] = token
      loadLists(counter)
    }
  }, [counter])

  const loadLists = async (page) => {
    setIsLoading(true)
    const response = await lists(page)
    setIsLoading(false)
    if (response.data) {
      setList(response.data.data)
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

  const handleSearch = (e) => {
    setSearch(e.target.value)
    
    const searchResult = allList.filter((item) => item.username.toLowerCase().includes(search.toLowerCase()) || item.prompt.toLowerCase().includes(search.toLowerCase()))
    setSearchResult(searchResult)
  }

  return (
    <>
    <Navbar />
    <section className='mx-5 md:container md:mx-auto md:px-48 mt-10 mb-10'>
      <div>
        <h1 className='font-semibold text-3xl'>Welcome to the Community Gallery</h1>
        <p className='mt-2 text-gray-500 text-xl'>Explore a collection of imaginative and visually stunning images created by IMATE. Share your boundless imagination and artistic flair with others.</p>
      </div>
      <div className='mt-12'>
        <input type="text" placeholder="Search here..." onChange={handleSearch} value={search} required name='search' className="input input-bordered input-md w-full" />
      </div>
      
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
              {search && (
                <h2 className='font-medium text-gray-600 text-xl mb-5'>Showing results for <span className='text-gray-950'>{search}</span></h2>
              )}
                {search ? (
                  searchResult.length > 0 ? (
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                      {
                        searchResult.map((list, i) => (
                          <div className="rounded-xl group relative card" key={i}>
                          <img className="w-full h-auto object-cover rounded-xl" src={list.photo} />
                            <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] m-2 p-4 rounded-md">
                              <p className="text-white text-sm overflow-y-auto">{list.prompt}</p>
                              <div className="mt-5 flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full object-cover bg-blue-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                                  <p className="text-white text-sm">{list.username}</p>
                                </div>
                                <button type="button" className="outline-none text-white bg-transparent border-none">
                                  <i className="fa-solid fa-download"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="w-full h-80 flex justify-center items-center">
                      <h1 className='text-red-600 text-2xl font-bold'>No Search Result Found</h1>
                    </div>
                  )
                ) : (
                  allList.length > 0 && (
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                      {
                        allList.map((list, i) => (
                          <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card" key={i}>
                            <img className="w-full h-auto object-cover rounded-xl" src={list.photo} />
                            <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] m-2 p-4 rounded-md">
                              <p className="text-white text-sm overflow-y-auto prompt">{list.prompt}</p>
                              <div className="mt-5 flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full object-cover bg-blue-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                                  <p className="text-white text-sm">{list.username}</p>
                                </div>
                                <a href={list.photo} download={`image_${i}.jpg`} className="outline-none text-white bg-transparent border-none">
                                  <i className="fa-solid fa-download"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                )}
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
    </section>
    <Footer />
    </>
  )
}
