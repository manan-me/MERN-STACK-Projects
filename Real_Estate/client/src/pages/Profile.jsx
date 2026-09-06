import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-center text-slate-700 my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          value={currentUser.username}
          id="username"
          className="border p-3 rounded-lg text-sm"
        />
        <input
          type="email"
          placeholder="email"
          value={currentUser.email}
          id="email"
          className="border p-3 rounded-lg text-sm"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            id="password"
            className="border p-3 rounded-lg text-sm w-full"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 cursor-pointer text-slate-400"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase text-sm">
          Update Profile
        </button>
      </form>
      <div className="flex justify-between mt-5 text-sm">
        <span className="text-red-500 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-slate-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
