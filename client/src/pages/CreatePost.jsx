import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getRandomPrompt } from '../utils'
import Footer from '../components/Footer'

export default function CreatePost() {
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  })

  const [form, setForm] = useState({
    username: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setIsLoading] = useState(false)

  const generateImg = () => {
    
  }

  const handleGenerate = (e) => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  }

  return (
    <>
    <Navbar />
    <section className='mx-5 md:container md:mx-auto md:px-48 mt-10 mb-10'>
      <div className='max-w-5xl'>
        <h1 className='font-extrabold text-3xl'>Create</h1>
        <p className='mt-2 text-gray-500 text-xl'>Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
      </div>
      <form className='mt-10 max-w-3xl mb-2' onSubmit={handleGenerate}>
        <div className="flex justify-end">
          <button onClick={handleSurpriseMe} className='btn btn-primary btn-sm text-white mb-3' type='button'>Surprise me</button>
        </div>
        <input type="text" placeholder="Prompt" name='prompt' value={form.prompt} onChange={handleGenerate} className="input input-bordered input-md w-full" />
        <div className="relative mx-auto md:mx-0 bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {
            form.photo ? (
              <img className='w-full h-full object-contain' src={form.photo} />
            ) : (
              <img className='w-9/12 h-9/12 object-contain opacity-40' src='/images/imgPreview.png' />
            )
          }
          {
            generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-slate-200 rounded-lg">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            )
          }
        </div>
        <div className="mt-5 flex gap-5">
          <button className='text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='button' onClick={generateImg}>{generatingImg ? 'Generating...' : 'Generate'}</button>
        </div>
        <div className="mt-10 mb-16 text-md text-gray-400">
          <p>Once you have created the image you want, you can share it with others in the community</p>
          <button className='mt-3 text-white bg-indigo-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='button'>{loading ? 'Sharing...' : 'Share with community'}</button>
        </div>
      </form>

    </section>
    <Footer />
    </>
  )
}
