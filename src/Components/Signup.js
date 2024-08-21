import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { BiLoaderAlt } from "react-icons/bi";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [customAlert, setCustomAlert] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !pass || pass.length < 6) {
      setCustomAlert(true);
      return;
    }

    setLoading(true); // Set loading to true when starting sign-up

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      const user = auth.currentUser;
      console.log(user);

      toast.success("Account created successfully!", {
        position: "top-center"
      });

      setName("");
      setEmail("");
      setPass("");
      setCustomAlert(false);
    } catch (error) {
      console.log("error", error.message);
      toast.error(error.message, {
        position: "top-center"
      });
    } finally {
      setLoading(false); // Reset loading state after process completes
    }
  };

  return (
    <div>
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-200 via-slate-500 to-slate-200">
        <div className="px-5 sm:px-10 py-10 rounded-xl bg-white tracking-wider w-full sm:w-auto mx-3 sm:mx-0 shadow-xl">
          <h1 className="text-center font-bold text-2xl sm:text-4xl">Sign Up</h1>

          <form className="pt-10 pb-3 flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              className="border-2 p-2 rounded w-full sm:w-96 focus:border-slate-500 focus:outline-none"
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {customAlert && !name && <p className="text-red-500">Name is required*</p>}
            
            <input
              type="email"
              className="border-2 p-2 mt-8 rounded w-full sm:w-96 focus:border-slate-500 focus:outline-none"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {customAlert && !email && <p className="text-red-500">Email is required*</p>}
            
            <input
              type="password"
              className="border-2 p-2 mt-8 rounded w-full sm:w-96 focus:border-slate-500 focus:outline-none"
              placeholder="Password*"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {customAlert && (!pass || pass.length < 6) && (
              <p className="text-red-500">
                {!pass ? 'Password is required*' : 'Password must be at least 6 characters'}
              </p>
            )}

            <button
              type="submit"
              className="bg-slate-500 p-2 mt-8 rounded text-white font-bold hover:bg-slate-400 active:bg-slate-700 focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 transition-all h-10 flex justify-center items-center"
            >
              {loading ? <BiLoaderAlt className='animate-spin text-2xl' /> : "Sign Up"}
            </button>
          </form>

          <h1>
            Already have an account?{" "}
            <Link to="/login" className="text-slate-500 font-medium hover:border-slate-500 hover:border-b-2 pb-1 transition-all">
              Login
            </Link>
          </h1>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
