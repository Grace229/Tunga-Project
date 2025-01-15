
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import customInstance from '../axios_http_client';

const Navbar = () => {
  const dispatch = useDispatch();
  const {  isLoggedIn, user} = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
    const logOut = async () => {
      try {
        const response = await customInstance.get('/logout');
        dispatch(logout);
        localStorage.setItem('authToken', response.data.token)
        console.log(response.data);
        toast.success(response.data.message);  
      
      } catch (err) {
          console.log(err)
        alert('Error fetching data');
      }
    };

  return (
    <nav className="bg-[#002061] fixed top-0 w-full shadow-lg z-50">
    <div className="mx-auto py-3 px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* <!-- Mobile menu button--> */}
          <button onClick={() => setShowMobileMenu((prev) => !prev)}type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex lg:flex-1 xl:ml-0 lg:ml-0 md:ml-0 ml-14 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex shrink-0 items-center">
       <h1 className="text-[#ed3273] xl:text-2xl lg:text-2xl text-xl font-bold">Grace BLOG</h1>
          </div>
          <div className="hidden sm:ml-6 lg:ml-32   sm:block">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-40">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          />
            {!isLoggedIn && (
            <div className="flex space-x-8">
            <Link
                to="/signin"
                className="bg-[#ed3273] text-white px-4 py-2 rounded-lg hover:bg-[#fff] hover:text-[#ed3273] transition"
              >
                Login
              </Link>
       
              <Link to="register" className="bg-[#fff] text-[#ed3273] px-4 py-2 rounded-lg hover:bg-[#ed3273] hover:text-[#fff] transition">
                Signup
              </Link>
        </div>
              )}
                {isLoggedIn && (
            <div className="flex space-x-8">
            <Link
                to="/signin"
                className="bg-[#ed3273] text-white px-4 py-2 rounded-lg hover:bg-[#fff] hover:text-[#ed3273] transition"
              >
                Add Post
              </Link>
        </div>
              )}
        </div>
            </div>
          </div>
        </div>
        {isLoggedIn && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="relative ml-3"> 
            <div className="flex">
                  <p className="text-sm mr-1 text-[#ed3273]">
                  {isLoggedIn ? (
      `${user.email.replace('@gmail.com', '')}`
    ) : (
      "Welcome"
    )}</p>
                  <button onClick={() => setShowMenu((prev) => !prev)}>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  fill="#ed3273"  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                  </button>

            </div>
            {showMenu && (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
              {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a> */}
              <button onClick={logOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
            </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  
    {showMobileMenu && (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-10 pb-3 pt-2">
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        <input
            type="text"
            placeholder="Search..."
            className="px-3 w-full py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {!isLoggedIn && (
            <div className="flex flex-col space-y-8 pt-5">
            <Link
                to="/signin"
                className="bg-[#ed3273] text-white text-center px-4 py-2 rounded-lg hover:bg-[#fff] hover:text-[#ed3273] transition"
              >
                Login
              </Link>
       
              <Link to="register" className="bg-[#fff] text-center text-[#ed3273] px-4 py-2 rounded-lg hover:bg-[#ed3273] hover:text-[#fff] transition">
                Signup
              </Link>
        </div>
              )}
                 {isLoggedIn && (
            <div className="flex flex-col space-y-8 pt-5">
            <Link
                to="/signin"
                className="bg-[#ed3273] text-white text-center px-4 py-2 rounded-lg hover:bg-[#fff] hover:text-[#ed3273] transition"
              >
               Add Post
              </Link>
        </div>
              )}
      </div>
    </div>
    )}
  </nav>
  
  )
}

export default Navbar

// import React, { useState } from "react";

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     console.log("User logged out");
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-gray-800 p-4 shadow-lg z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-white text-xl font-bold">MyApp</div>

//         {/* Search Field */}
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="space-x-4">
//           {!isLoggedIn ? (
//             <>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                 onClick={() => setIsLoggedIn(true)}
//               >
//                 Login
//               </button>
//               <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
//                 Signup
//               </button>
//             </>
//           ) : (
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
