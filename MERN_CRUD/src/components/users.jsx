import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User() {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/')
        .then((res)=>setUsers(res.data))
        .catch((e)=>{console.log(e);
        })
    },[])


    const handleDelete=(id)=>{
        axios.delete(`http://localhost:8000/delete/${id}`)
        .then(()=>{console.log(`deleted user of id ${id}`)
        setUsers(users.filter((u) => u._id !== id))
        })
        .catch((e)=>{console.log(e);
        })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Users</h4>
                <Link to='/create' className="btn btn-primary">Add +</Link>
            </div>

            <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td className="d-flex gap-2">
                                <Link to={`/update/${user._id}`} className="btn btn-sm btn-warning">Update</Link>
                                <button onClick={()=>handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;