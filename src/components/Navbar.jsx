// import { useState, useEffect } from "react";
import { BsSun } from "react-icons/bs";
import { BiSolidSun } from "react-icons/bi";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <div className={`navbar shadow-md px-4 sm:px-8 ${theme === 'dark' ? 'bg-primary/40' : 'bg-primary/80 text-white'} fixed top-0 `}>
      <div className="flex-1">
        <h1 className="text-lg font-bold mx-4">Task-Tracker</h1>
      </div>
      <div className="flex-none">
        {/* Toggle button here */}
        <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={toggleTheme}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
            {/* light theme sun image */}
            <BiSolidSun className="w-8 h-8 swap-off" />
            <BsSun className="w-8 h-8 swap-on" />
            {/* dark theme moon image */}
          </label>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
