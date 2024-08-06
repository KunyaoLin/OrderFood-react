import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import { SignOutAccount } from "../lib/service";
import { useMenu } from "./MenuContext";

function NavBar() {
  const { signOut, user, isAuthenticated } = useMenu();
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await SignOutAccount();
    if (error) {
      console.error("Error signOut:", error.message);
    } else {
      if (window.confirm("Are you sure to sign out your account?")) {
        signOut();
        navigate("/");
      }
    }
  }
  return (
    <div className="fixed grid grid-cols-2 w-full justify-between bg-primary-50 ">
      <div className="grid grid-cols-[123px_1fr]">
        <Logo />
      </div>
      <ul className="grid grid-cols-3 w-full  justify-between items-center gap-4">
        <li>
          <Link
            to="/menu"
            className="uppercase font-semibold px-5 text-stone-500"
          >
            menu
          </Link>
        </li>
        <li className="w-full justify-center items-center">
          <Link
            to="/cart"
            className="uppercase font-semibold px-5 text-stone-500"
          >
            cart
          </Link>
        </li>

        <li className="flex flex-row items-center justify-center space-x-2">
          <div>
            {isAuthenticated ? (
              <div className="flex flex-row space-x-3">
                <div>
                  <Link
                    to="/account/order"
                    className="uppercase font-semibold px-5 text-stone-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>{user}'s</span>
                      <span>Order</span>
                    </div>
                  </Link>
                </div>
                <button
                  className="items-center justify-center flex transform active:scale-95"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt size={24} />
                </button>
              </div>
            ) : (
              <Link
                to="/account"
                className="uppercase font-semibold px-5 text-stone-500"
              >
                account
              </Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
