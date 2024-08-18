import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app, database } from './firebase';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiLoaderAlt } from "react-icons/bi";
import Read from './Read';

function Write() {
    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingDisplay, setLoadingDisplay] = useState(false); // New loading state for display
    const [usersArray, setUsersArray] = useState([]);

    const navigate = useNavigate();

    const saveData = async () => {
        if (!input || !description) {
            toast.error("Please fill out the empty fields", {
                position: "top-center"
            });
            return;
        }

        setLoading(true);

        const db = getDatabase(app);
        const newDoc = push(ref(db, "users"));
        set(newDoc, {
            userName: input,
            userDescription: description
        })
        .then(() => {
            toast.success("Data saved successfully", {
                position: "top-center"
            });
            setInput("");
            setDescription("");
        })
        .catch((error) => {
            toast.error(`Error: ${error.message}`, {
                position: "top-center"
            });
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const displayData = async () => {
        setLoadingDisplay(true);

        const db = getDatabase(app);
        const dbRef = ref(db, "users");
        const snapShot = await get(dbRef);
        if (snapShot.exists()) {
            const users = Object.values(snapShot.val());
            setUsersArray(users);
            navigate('/read', { state: { users } }); // Navigate to the Read page with data
        } else {
            navigate('/read')
        }

        setLoadingDisplay(false); // Reset loading state after data is fetched
    };
    

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-700 tracking-wider px-3'>
            <h1 className='text-white text-xl sm:text-2xl text-center mb-2'>Realtime Database (Firebase)</h1>
            <h2 className='text-white mb-10 text-center font-thin'>Save and Display your Data</h2>
            <div className='flex flex-col gap-5 bg-gray-300 p-5 sm:p-10 w-full sm:w-[500px] text-sm sm:text-base rounded'>
                <input 
                    type="text" 
                    className='p-2 outline-none border-2 border-white rounded focus:border-blue-500' 
                    placeholder='Username' 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <textarea 
                    rows="5" 
                    placeholder='Description...' 
                    className='p-2 outline-none border-2 border-white rounded focus:border-blue-500'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                <div className='flex gap-5'>
                    <button 
                        className='bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600 active:bg-blue-950 h-10 flex justify-center items-center w-1/2 transition-colors'
                        onClick={saveData}
                    >
                        {loading ? <BiLoaderAlt className='animate-spin text-2xl' /> : "Save Data"}
                    </button>

                    <button 
                        onClick={displayData}
                        className='text-blue-500 bg-white p-2 rounded font-semibold hover:bg-blue-600 hover:text-white border-blue-500 border active:bg-blue-950 h-10 flex justify-center items-center w-1/2 transition-colors'
                    >
                        {loadingDisplay ? <BiLoaderAlt className='animate-spin text-2xl' /> : "Display Data"}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Write;
