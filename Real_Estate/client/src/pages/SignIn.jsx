import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setFormData({ email: "", password: "" });

      if (!data.success) {
        setError(data.message);
        console.log(error);
        setLoading(false);
        return;
      }

      console.log(data);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(
        "Something went wrong. Please try again." + "/n/n!!!" + err.message,
      );
    } finally {
      setLoading(false);
      setFormData({ username: "", email: "", password: "" });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 sm:mt-20">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="email"
          value={formData.email}
          onChange={handleChange}
          type="text"
          placeholder="Enter Your email"
          className="border p-3 rounded-lg text-sm w-full"
        />
        <input
          id="password"
          value={formData.password}
          onChange={handleChange}
          type="text"
          placeholder="Enter Your password"
          className="border p-3 rounded-lg text-sm w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-70 w-full"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <div className="flex gap-2 mt-5 text-sm">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"} className="text-blue-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
