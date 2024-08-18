import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function Read() {
  const location = useLocation();
  const usersArray = location.state?.users || [];

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 tracking-wider">
      <div className="flex flex-col gap-5 bg-gray-300 py-10 px-5 sm:px-10 w-[700px] rounded my-5 mx-2">
        {usersArray.length > 0 ? (
          <section>
            <FaArrowLeft
              className="bg-blue-500 text-white p-2 w-10 h-8 mb-6 cursor-pointer hover:bg-blue-600 active:bg-blue-900 rounded transition-colors"
              onClick={() => {
                navigate("/");
              }}
            />
            <table className="w-full table-fixed text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-600 text-white font-medium tracking-widest">
                  <td className="w-1/3 border border-black p-2 text-start">
                    User Name
                  </td>
                  <td className="w-2/3 border border-black p-2 text-start">
                    Description
                  </td>
                </tr>
              </thead>
              <tbody>
                {usersArray.map((item, index) => (
                  <tr key={index}>
                    <td className="w-1/3 border border-black p-2 break-words align-top">
                      {item.userName}
                    </td>
                    <td className="w-2/3 border border-black p-2 break-words align-top">
                      {item.userDescription}
                    </td>
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
                onClick={() => {
                  navigate("/");
                }}
              >
                Go back
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Read;
