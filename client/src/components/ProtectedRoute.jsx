import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validate } from '../libs/api'
import axios from 'axios'

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = token

  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      validation()
    }
  }, [])

  const validation = async () => {
    const response = await validate()   
    if (!response.data) {
        localStorage.removeItem('token')
        navigate('/')
    }
  }

  // const refreshToken = async () => {
  //   const response = await refreshtoken()
  //   if (response.data) {
  //       localStorage.removeItem('token')
  //       localStorage.setItem(response.data.token)
  //       axios.defaults.headers.common['Authorization'] = response.data.token
  //       validation()
  //   } else {
  //       console.log(response.response.data.message)
  //   }
  // }
  return (
    <>
      {children}
    </>
  )
}
