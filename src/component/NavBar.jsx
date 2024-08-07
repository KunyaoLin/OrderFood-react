import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import { SignOutAccount } from "../lib/service";
import { useMenu } from "./MenuContext";
import { useState } from "react";

function NavBar() {
  const { signOut, user, isAuthenticated } = useMenu();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    if (window.confirm("Are you sure to sign out your account?")) {
      const { error } = await SignOutAccount();
      if (error) {
        console.error("Error signOut:", error.message);
      } else {
        signOut();
        navigate("/");
      }
    }
  }

  return (
    <div className="fixed w-full bg-primary-50 shadow-md z-50">
      <div className="flex justify-between items-center p-4">
        <Logo />
        <div className="hidden md:flex space-x-6">
          <Link to="/menu" className="uppercase font-semibold text-stone-500">
            Menu
          </Link>
          <Link to="/cart" className="uppercase font-semibold text-stone-500">
            Cart
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/account/order"
                className="uppercase font-semibold text-stone-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <span>{user}</span>
                  <span>Order</span>
                </div>
              </Link>
              <button
                className="flex items-center justify-center text-stone-500 transform active:scale-95"
                onClick={handleSignOut}
              >
                <FaSignOutAlt size={24} />
              </button>
            </div>
          ) : (
            <Link
              to="/account"
              className="uppercase font-semibold text-stone-500"
            >
              Account
            </Link>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-stone-500"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-primary-50 p-4 space-y-4">
          <Link to="/menu" className="uppercase font-semibold text-stone-500">
            Menu
          </Link>
          <Link to="/cart" className="uppercase font-semibold text-stone-500">
            Cart
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/account/order"
                className="uppercase font-semibold text-stone-500"
              >
                {user}'s Orders
              </Link>
              <button
                className="flex items-center justify-center text-stone-500 transform active:scale-95"
                onClick={handleSignOut}
              >
                <FaSignOutAlt size={24} />
                <span className="ml-2">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/account"
              className="uppercase font-semibold text-stone-500"
            >
              Account
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
