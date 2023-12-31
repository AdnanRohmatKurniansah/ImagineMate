import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../libs/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const registerHandle = async (e) => {
    e.preventDefault()

    const formData = new FormData;
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('password', form.password)

    const data = Object.fromEntries(formData)

    const response = await register(data)
    if (response.data) {
        alert(response.data.message, 'success');
        navigate('/')
    } else {
        if (response.response.status === 409) {
            alert(response.response.data.message, 'error');
        } else {
            const errorMessages = response.response.data.errors;
                errorMessages.forEach((error) => {
                alert(error.msg, 'error');
            });
        }
    }
  }

  return (
    <div className='flex h-screen items-center justify-center' style={{ backgroundImage: `url('/images/background.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="bg-gray-700">
            <div className='w-96 border border-gray-400 p-5 py-16 bg-white transition-transform transform -translate-x-2 -translate-y-2'>
                <div className="flex items-center justify-start mb-5">
                    <img src="/images/logo.png" alt="Logo" className="mr-1"/>
                    <h1 className="text-2xl font-bold text-center">IMATE</h1>
                </div>
                <form className='text-center' onSubmit={registerHandle}  >
                    <input type="text" required placeholder="Username" name='username' onChange={handleChange} value={form.username} className="input input-bordered input-md w-full mb-5" />
                    <input type="email" required placeholder="Email" name='email' onChange={handleChange} value={form.email} className="input input-bordered input-md w-full mb-5" />
                    <input type="password" required placeholder="Password" name='password' onChange={handleChange} value={form.password} className="input input-bordered input-md w-full mb-5" />
                    <div className="flex text-left">
                        <button type='submit' className='btn btn-info hover:bg-cyan-500 text-white rounded-none mr-3'>Register</button>
                        <Link to={'/'} className='btn btn-warning hover:bg-amber-500 text-white rounded-none'>Login</Link>
                    </div>
                </form>
            </div>  
        </div>
    </div>
  )
}
