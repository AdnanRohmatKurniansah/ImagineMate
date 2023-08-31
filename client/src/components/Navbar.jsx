import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const getUsername = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      const email = decodedToken.email
      
      if (email) {
        const name = email.split('@')[0];
        return name.charAt(0).toUpperCase();
      }      
    }
    return ''
  };

  return (
    <div className="navbar bg-base-100 border">
        <div className="navbar-start">
            <Link to={'/dashboard'} className="normal-case flex text-2xl">
              <img src="/images/logo.png" width="100%" alt="" />
              <h1 className='ml-2 my-auto font-bold'>IMATE</h1>
            </Link>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-blue-600 text-white">
                  <h1 className='my-1 text-xl'>{getUsername()}</h1>
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><Link to={'/create_post'}>Create new</Link></li>
                <li><Link to={'/history'}>History</Link></li>
                <li><button onClick={logoutHandler}>Logout</button></li>
              </ul>
            </div>
        </div>
    </div>
  )
}
