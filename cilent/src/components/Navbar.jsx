import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <>
      <nav className="text-blue-900 text-[1.25rem] font-bold gap-[2rem]">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between h-16">
          <div className="flex ">
            <div className="flex-shrink-0 flex justify-start items-center">
            <p className="text-2xl text-indigo-900 font-semibold">FlavorFusion</p>
            </div>
          
          <div className="hidden gap-2 md:flex text-lg font-medium mt-[4px]">
          <Link className='p-2' to="/">Home</Link>
        {!cookies.access_token ? (
          <Link className='p-2' to='/auth'>Login</Link>
        ) : (
          <>
          <Link to="/create-recipe" className="p-2">Create-recipe</Link>
        <Link to="/saved-recipe" className="p-2">Saved-recipe</Link>
          <button onClick={logout} className="p-2 mt-[-16px]">Logout</button>
          </>
        )}
          </div>
          </div>
          <div className="-mr-2 flex md:hidden ">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black inline-flex items-center justify-center p-2 rounded-md focus:outline-none ">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden text-blue-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link className='p-2' to="/">Home</Link>
        {!cookies.access_token ? (
          <Link className='p-2' to='/auth'>Login</Link>
        ) : (
          <>
          <Link to="/create-recipe" className="p-2">Create-recipe</Link>
        <Link to="/saved-recipe" className="p-2">Saved-recipe</Link>
          <button onClick={logout} className="p-2">Logout</button>
          </>
        )}
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
