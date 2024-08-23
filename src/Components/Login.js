import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { BiLoaderAlt } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customAlert, setCustomAlert] = useState(false);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password || password.length < 6) {
      setCustomAlert(true);
      return;
    }

    setLoading(true);  

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      navigate("/write");  

    } catch (error) {
      console.log("Login failed", error.message);
      toast.error("Invalid email or password", {
        position: "top-center"
      });
      setCustomAlert(true);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-200 via-slate-500 to-slate-200">
        <div className="px-5 sm:px-10 py-10 rounded-xl bg-white tracking-wider w-full sm:w-auto mx-3 sm:mx-0 shadow-xl">
          <h1 className="text-center font-bold text-2xl sm:text-4xl">Login</h1>
          <form className="pb-3 flex flex-col">
            <input
              type="email"
              className="mt-8 border-2 p-2 rounded w-full sm:w-96 focus:border-slate-500 focus:outline-none"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {customAlert && !email && <p className="text-red-500">Email is required*</p>}
            <input
              type="password"
              className="mt-8 border-2 p-2 rounded w-full sm:w-96 focus:border-slate-500 focus:outline-none"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {customAlert && (!password || password.length < 6) && (
              <p className="text-red-500">
                {!password ? 'Password is required*' : 'Password must be at least 6 characters'}
              </p>
            )}
            <button
              onClick={handleClick}
              className="mt-8 bg-slate-500 p-2 rounded text-center text-white font-bold hover:bg-slate-400 active:bg-slate-700 focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 transition-all h-10 flex justify-center items-center"
            >
              {loading ? <BiLoaderAlt className='animate-spin text-2xl' /> : "Login"}
            </button>
          </form>

          <h1 className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-slate-500 font-medium hover:border-slate-500 hover:border-b-2 pb-1 transition-all">
              Sign Up
            </Link>
          </h1>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Login;
