import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="h-full min-h-full">
      <Navbar />
      <main className="px-4 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;