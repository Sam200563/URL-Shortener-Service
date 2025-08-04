import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData,setFormData] = useState({email:'',password:''})
  const [error,setError]=useState('')
  const navigate= useNavigate()
  const {login}=useAuth()

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    setError('')
    if(!formData.email || !formData.password){
      setError('All fields are required')
    }
    try {
      const response = await loginUser(formData)
      if(response.token){
        //localStorage.setItem('token',response.token);
        login(response.token)
        console.log('Login successfull! check your JWT:',response.token)
        alert('Login Successful !!')
        console.log('navigating to dashboard')
        navigate('/dashboard')
      }else{
        console.log('Login successfull ,but JWT is not provided')
      }     

    } catch (err) {
      const errormessage = err.error || 'Login failed ! Check your credentials'
      setError(errormessage)
      console.error('Login failed',err)
    }

    console.log('LoginDetails:',formData)
  }
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back !!</h2>
        <p className="text-center text-slate-500 mb-6">Login to access your dashboard</p>
        <form onSubmit={handleSubmit}className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" id='email' placeholder='Enter the email' name='email' value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" id='password' placeholder='Type your password' name='password' value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        <button type='submit' className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-6 text-center text-sm">
                Don't Have Account {<Link to='/register' className="font-medium text-blue-600 hover:underline">Create account</Link>}
              </p>
              {error && (<p className="mt-4 text-center text-red-500">{error}</p>)}
      </div>
    </div>
  )
}

export default Login
