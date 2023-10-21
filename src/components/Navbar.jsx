import { useState, useEffect } from "react";
import { BsSun } from "react-icons/bs";
import { BiSolidSun } from "react-icons/bi";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
      <div className="flex-1">
        {/* <img src={logo} alt="OM" className="btn bt-ghost p-0" /> */}
        <h1 className="text-lg font-bold mx-4">Task-Tracker</h1>
      </div>
      <div className="flex-none">
        {/* Toggle button here */}
        <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
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
