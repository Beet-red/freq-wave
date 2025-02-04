import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/User'
import Loading from '../components/Loading'
import { SongData } from '../context/Song'

const Login = () => {

    const  [email, setEmail] = useState("")
    const  [password, setPassword] = useState("")

    const {loginUser, buttonLoading} = UserData();

    const { fetchSongs, fetchAlbums } = SongData();

    const navigate =  useNavigate()

    const submitHandler = e => {
        e.preventDefault()

        loginUser(email, password, navigate, fetchSongs, fetchAlbums)
    }
  return (
    <div className='flex items-center justify-center h-screen max-h-screen'>
        <div className='bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full'>
            <h2 className="text-3xl font-semibold text-center mb-8">Login To Freq-Wave </h2>
            <form  className="mt-8" onSubmit={submitHandler}>
                <div className='mb-4'>
                    <label className= 'block text-sm font-medium mb-2'>
                        Email or Username
                    </label>
                    <input type='email' placeholder='Email or Username' className= 'auth-input' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='mb-4'>
                    <label className= 'block text-sm font-medium mb-2'>
                        Password
                    </label>
                    <input type='password' placeholder='Password' className= 'auth-input' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button disabled={buttonLoading} className='auth-button mt-4'>
                    {buttonLoading ? <Loading/> : "Login"}
                </button>
            </form>
            <div className="text-center mt-6">
                <Link to="/register" className='text-sm text-green-400 hover:text-green-300' >
                    Don't Have a Acount?? Register Here!!
                </Link>
            </div>
        </div> 
    </div>
  )
}

export default Login
