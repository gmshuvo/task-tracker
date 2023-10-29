import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTheme } from "../contexts/ThemeContext";
import {useNavigate} from "react-router-dom"

const Settings = () => {
  const { selectTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-32">
      <div className="w-full md:w[80%] lg:w-[70%] h-full bg-slate-400/20 shadow rounded-sm">
        <div className="p-4 flex item-center justify-between border-b-[1px] border-slate-300">
          <button className="flex-1 " onClick={()=> navigate("/")}>
            <AiOutlineArrowLeft className="w-8 h-8 p-2 bg-gray-400/20 rounded-full" />
          </button>
          <h1 className="text-2xl font-bold flex-1 text-center">Settings</h1>
          <div className="flex-1"></div>
        </div>
        <div className="p-4">
          {/* change theme option */}
          <div className="flex items-center justify-between mb-4 ">
            <h1 className="text-xl font-bold">Change Theme</h1>
            <div className="flex items-center">
              <select onChange={selectTheme} className="px-3 py-2 focus:outline-none rounded cursor-pointer">
                <option value="light" className="">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
