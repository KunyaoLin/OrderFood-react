import SignupPage from "./SignupPage";
import NavBar from "../component/NavBar";
import LoginPage from "./LoginPage";
import { Outlet } from "react-router-dom";

function Account() {
  return (
    <div className="flex flex-rows-[80px_1fr] h-full w-full fixed bg-primary-50">
      <div>
        <NavBar />
      </div>
      <div className="flex w-full h-full pt-20 flex-col justify-center items-center">
        <Outlet />
      </div>
      ;
    </div>
  );
}

export default Account;
