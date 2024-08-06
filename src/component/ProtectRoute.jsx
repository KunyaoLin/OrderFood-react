import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../lib/service";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useMenu } from "./MenuContext";

function ProtectRoute({ children }) {
  const { isAuthenticated } = useMenu();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      function login() {
        if (!isAuthenticated) {
          navigate("/account/login", { replace: true });
          setLoading(false);
        }
      }
      login();
      setLoading(false);
    },
    [navigate, isAuthenticated]
  );
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  //   if (!session) {
  //     return null;
  //   }
  return children;
}

export default ProtectRoute;
