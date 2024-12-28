import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";
const NavBar = () => {
  const navigate = useNavigate();
  const {token,setToken,userData} = useContext(AppContext)
  const [showMenue, setShowmenue] = useState(false);
  const logout = () =>{
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <div className="flex item-centre justify-between text-sm py-4 nb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-44 cursor-pointer"
      ></img>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACTS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex item_center gap-4">
        {token && userData ? (
          <div className="flex items-centre gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rouded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowmenue(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/*-----Mobile Menue--------------*/}
        <div
          className={`${
            showMenue ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflaow-hidden bg-white transition-all`}
        >
          <div className="flex item-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowmenue(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col item-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink className="text-center" onClick={() => setShowmenue(false)} to="/">
              <p className="px-4 py-2 rounded text-center inline-block">Home</p>
            </NavLink>
            <NavLink className="text-center" onClick={() => setShowmenue(false)} to="/doctors">
              <p className="px-4 py-2 rounded text-center inline-block">
                All doctors
              </p>
            </NavLink>
            <NavLink className="text-center" onClick={() => setShowmenue(false)} to="/about">
              <p className="px-4 py-2 rounded text-center inline-block">
                About
              </p>
            </NavLink>
            <NavLink className="text-center" onClick={() => setShowmenue(false)} to="/contact">
              <p className="px-4 py-2 rounded text-center inline-block">
                Contact
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;