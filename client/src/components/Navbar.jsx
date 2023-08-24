import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border">
        <div className="navbar-start">
            <Link to={'/'} className="btn btn-ghost normal-case text-xl">GPT</Link>
        </div>
        <div className="navbar-end">
            <Link to={'/create_post'} className="btn btn-primary text-white">Create</Link>
        </div>
    </div>
  )
}
