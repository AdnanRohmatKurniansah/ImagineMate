import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getRandomPrompt } from '../utils'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { share } from '../libs/api'


export default function GenerateImg() {
  const token = localStorage.getItem('token')
  
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      axios.defaults.headers.common['Authorization'] = token
    }
  })

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

  const [form, setForm] = useState({
    prompt: '',
    photo: ''
  })

  const formData = new FormData()
  formData.append('prompt', form.prompt)
  formData.append('photo', form.photo)

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setIsLoading] = useState(false)
  
  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await axios.post(
          import.meta.env.VITE_HUG_URL,
          { inputs: form.prompt },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_HUG_KEY}`,
            },
            responseType: 'arraybuffer', 
          }
        );
        setForm({ ...form, photo: `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}` });
        setGeneratingImg(false)
      } catch (error) {
        console.log(error)
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt', 'error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({
      ...form, 
      prompt: randomPrompt
    })
  }

  const sharing = async (e) => {
    e.preventDefault();

    if (formData) {
      setIsLoading(true)
      const response = await share(formData)
      alert(response.data.message, 'success')
      navigate('/dashboard')
    } else {
      if (response.response.status === 400) {
        const errorMessages = response.response.data.errors;
        errorMessages.forEach((error) => {
          alert(error.msg, 'error');
        });
      } else {
        alert(response.response.data.message, 'error')
      }
    }

  }

  return (
    <>
    <Navbar />
    <section className='mx-5 md:container md:mx-auto md:px-48 mt-10 mb-10'>
      <div className='max-w-5xl'>
        <h1 className='font-extrabold text-3xl'>Create</h1>
        <p className='mt-2 text-gray-500 text-xl'>Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
      </div>
      <form className='mt-6 max-w-3xl mb-2' onSubmit={sharing}>
        <div className="flex justify-end">
          <button onClick={handleSurpriseMe} className='btn btn-neutral btn-sm text-white mb-3' type='button'>Surprise me</button>
        </div>
        <input type="text" placeholder="Prompt" required name='prompt' value={form.prompt} onChange={handleChange} className="input input-bordered input-md w-full" />
        <div className="relative mx-auto md:mx-0 bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-64 p-1 h-64 flex justify-center items-center">
          {
            form.photo ? (
              <img className='w-full h-full object-contain' src={form.photo} />
            ) : (
              <img className='w-9/12 h-9/12 object-contain opacity-40' src='/images/imgPreview.png' />
            )
          }
          {
            generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            )
          }
        </div>
        <div className="mt-5 flex gap-5">
          <button className='text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='button' onClick={generateImg}>{generatingImg ? 'Generating...' : 'Generate'}</button>
        </div>
        <div className="mt-6 mb-16 text-md text-gray-400">
          <p>Once you have created the image you want, you can share it with others in the community</p>
          <button className='mt-3 text-white bg-indigo-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='submit'>{loading ? 'Sharing...' : 'Share with community'}</button>
        </div>
      </form>

    </section>
    <Footer />
    </>
  )
}
