import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import { app } from "./firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

function Read() {
  const [usersArray, setUsersArray] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const db = getDatabase(app);
    const user = auth.currentUser;

    if (user) {
      const usersRef = ref(db, "users");
      const userQuery = query(usersRef, orderByChild("userId"), equalTo(user.uid));

      try {
        const snapShot = await get(userQuery);

        if (snapShot.exists()) {
          const users = Object.values(snapShot.val());
          setUsersArray(users);
        } else {
          setUsersArray([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsersArray([]);
      }
    } else {
      console.log("User is not authenticated");
      setUsersArray([]);
    }

    setDataFetched(true);
  };

  useEffect(() => {
    // Ensure authentication is ready before fetching data
    const checkAuthAndFetchData = () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          fetchData();
        } else {
          setDataFetched(true);
        }
      });

      return () => unsubscribe();
    };

    checkAuthAndFetchData();
  }, []);

  return (
    <div className="flex justify-center items-start pt-5 min-h-screen bg-gray-700 tracking-wider text-white">
      {!dataFetched ? (
        <div className="flex items-center">
          <BiLoaderAlt className="animate-spin text-2xl" />
          <span className="ml-2 text-lg">Loading</span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 bg-gray-300 py-10 px-5 sm:px-10 w-[700px] rounded my-5 mx-2">
          {usersArray.length > 0 ? (
            <section>
              <FaArrowLeft
                className="bg-blue-500 text-white p-2 w-10 h-8 mb-6 cursor-pointer hover:bg-blue-600 active:bg-blue-900 rounded transition-colors"
                onClick={() => navigate("/write")}
              />
              <table className="w-full table-fixed text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-600 text-white font-medium tracking-widest">
                    <td className="w-[25%] sm:w-[30%] border border-black p-2 text-start">
                      User Name
                    </td>
                    <td className="w-[60%] border border-black p-2 text-start">
                      Description
                    </td>
                    {/* <td className="w-[15%] sm:w-[10%] border border-black p-2 text-start">
                      Edit
                    </td> */}
                  </tr>
                </thead>
                <tbody className="text-black">
                  {usersArray.map((item, index) => (
                    <tr key={index}>
                      <td className="w-[25%] sm:w-[30%] border border-black p-2 break-words align-top">
                        {item.userName}
                      </td>
                      <td className="w-[60%] border border-black p-2 break-words align-top">
                        {item.userDescription}
                      </td>
                      {/* <td className="w-[15%] sm:w-[10%] border border-black p-2">
                        <div className="flex justify-center">
                          <FaEdit className="cursor-pointer" />
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : (
            <div className="flex flex-col gap-6 h-32 justify-center">
              <p className="text-center text-red-500 text-2xl font-semibold">
                No data found
              </p>
              <p className="text-center text-gray-500 font-semibold">
                Please add some data.{" "}
                <button
                  className="text-blue-500 border-b-2 border-b-transparent hover:border-blue-500 transition-all"
                  onClick={() => navigate("/write")}
                >
                  Go back
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Read;
