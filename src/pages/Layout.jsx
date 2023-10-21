import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="h-full min-h-full">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;