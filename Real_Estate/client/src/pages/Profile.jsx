import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";
import { signInSuccess } from "../Features/userSlice";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: ""
  });

  const handleFileUpload = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be less than 2MB");
      return;
    }
    setUploading(true);
    setUploadError(null);
    const data = new FormData();
    data.append("avatar", file);
    try {
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: "PUT",
        body: data,
      });
      console.log(currentUser._id);
      const result = await res.json();
      if (!result.success) { setUploadError(result.message); return; }
      dispatch(signInSuccess(result.user));
    } catch (err) {
      setUploadError("Upload failed. Try again." + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFileUpload(selectedFile);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!result.success) return;
      dispatch(signInSuccess(result.user));
      setFormData({
        password: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">Your Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={handleFileChange} type="file" ref={fileRef} className="hidden" accept="image/*" />
        <div className="self-center">
          <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="w-20 h-20 rounded-full object-cover cursor-pointer hover:opacity-80 transition" />
          <p className="text-xs text-center text-slate-400 mt-1">{uploading ? "Uploading..." : "Click to change"}</p>
        </div>
        {uploadError && <p className="text-red-400 text-xs text-center">{uploadError}</p>}
        <input onChange={handleChange} type="text" value={formData.username} id="username" placeholder="Username" className="border border-slate-200 p-3 rounded-xl text-sm outline-none focus:border-slate-400 transition" />
        <input onChange={handleChange} type="email" value={formData.email} id="email" placeholder="Email" className="border border-slate-200 p-3 rounded-xl text-sm outline-none focus:border-slate-400 transition" />
        <div className="relative">
          <input onChange={handleChange} type={showPassword ? "text" : "password"} value={formData.password} id="password" placeholder="New Password" className="border border-slate-200 p-3 rounded-xl text-sm w-full outline-none focus:border-slate-400 transition" />
          <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 cursor-pointer text-slate-400">
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button type="submit" className="bg-slate-800 text-white p-3 rounded-xl text-sm font-medium hover:bg-slate-700 transition mt-1">Update Profile</button>
      </form>
      <div className="flex justify-between mt-6 text-sm">
        <span className="text-red-400 cursor-pointer hover:underline">Delete Account</span>
        <span className="text-slate-500 cursor-pointer hover:underline">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;