import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios.post("https://mern-stack-projects-production.up.railway.app/create", { name, email, age })
    .then((r)=>{
        console.log(r)
        setName('')
        setAge('')
        setEmail('')
        navigate('/')

        
    })
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4 className="mb-4">Add User</h4>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
}

export default CreateUser;
