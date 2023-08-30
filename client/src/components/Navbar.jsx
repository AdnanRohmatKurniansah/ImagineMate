import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100 border">
        <div className="navbar-start">
            <Link to={'/'} className="btn btn-ghost normal-case text-xl">IMaTe</Link>
        </div>
        <div className="navbar-end">
            <Link to={'/create_post'} className="text-md mr-5">Create</Link>
            <button type='button' onClick={logoutHandler} className='btn btn-primary text-white'>Logout</button>
        </div>
    </div>
  )
}
