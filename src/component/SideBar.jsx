import { useEffect, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useMenu } from "./MenuContext";
function SideBar() {
  const { getFood, rejected } = useMenu();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(
    function () {
      async function getFoodInfo() {
        setLoading(true);
        try {
          const { data, error } = await supabase.from("food").select("*");
          if (error !== null) {
            throw new Error("Something Wrong on getting food info");
          }
          getFood(data);
        } catch (error) {
          rejected();
        } finally {
          setLoading(false);
        }
      }
      getFoodInfo();
    },
    [location.pathname]
  );
  return (
    <div className=" bg-primary-50 grid h-full grid-cols-[105px_1fr] w-full fixed gap-4 mt-20">
      <ul className="grid mt-10 bg-primary-50 grid-row-4 h-96 text-lg w-side border border-bottom-">
        <li className=" border-gray-300">
          <Link to="lunch">Lunch</Link>
        </li>
        <li className=" border-gray-300">
          <Link to="dinner">Dinner</Link>
        </li>
        <li className=" border-gray-300">
          <Link to="dessert">Dessert</Link>
        </li>
        <li className=" border-gray-300">
          <Link to="beverage">Beverage</Link>
        </li>
      </ul>
      <div className="bg-primary-50">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <PiSpinnerGapBold size={40} className="animate-spin" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default SideBar;
