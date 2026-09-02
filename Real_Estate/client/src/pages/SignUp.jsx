import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    setLoading(true)
   try {
     const res=await fetch("/api/auth/sign-up",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData) 
    })
    const data=await res.json()

    setFormData({ username: '', email: '', password: '' })

    if(!data.success){
      setError(data.message)
      console.log(error);
      setLoading(false) 
      return
    }

    console.log(data)
    setLoading(false)
    setError(null)
    navigate("/sign-in")
  }

    catch (err) {
    setError("Something went wrong. Please try again."+ "/n/n!!!"+err.message)
  } finally {
    setLoading(false)
    setFormData({ username: '', email: '', password: '' })
  }
   
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
        <input id='username' value={formData.username} onChange={handleChange} type="text" placeholder="Enter Your Username" className="border p-3 rounded-lg" />
        <input id='email' value={formData.email} onChange={handleChange} type="text" placeholder="Enter Your email" className="border p-3 rounded-lg" />
        <input id='password' value={formData.password} onChange={handleChange} type="text" placeholder="Enter Your password" className="border p-3 rounded-lg" />
        <button type="submit" disabled={loading} className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"} className="text-blue-700">Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp