import { useEffect, useState } from "react";
import { GiPositionMarker } from "react-icons/gi";
import { supabase } from "./supabase";
import { useMenu } from "../component/MenuContext";

export const taxRate = 0.15;

export function useFoodList() {
  const [food, setFood] = useState();
  const [error, setError] = useState("");
  useEffect(
    function () {
      async function getFoodInfo() {
        try {
          const { data, error } = await supabase.from("food").select("*");
          if (error !== "") {
            setError(error);
            throw new Error("Something Wrong on getting food info");
          }
          setFood(data);
        } catch (error) {
          setFood();
        }
      }
      getFoodInfo();
    },
    [setError, setFood]
  );
  return { food, error };
}

export function useCurrentUser() {
  const [session, setSession] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    setLoading(true);
    async function getData() {
      try {
        const { data } = await supabase.auth.getSession();
        console.log(data);
        setSession(data.session);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getData();
  }, []);
  return { session, loading };
}

export async function SignInAccount({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}
export async function SignOutAccount() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function calcDeliveryTimeLeft(time) {
  const currentTime = new Date();
  const deliveryTime = new Date(currentTime.getTime() + time * 60000);
  return deliveryTime.toLocaleString();
}

export function DeliveryTime({ time }) {
  const deliveryTime = calcDeliveryTimeLeft(time);
  return (
    <div className="flex flex-row justify-between items-center ">
      <span>Estimate Preparation Time: </span>
      <span>{formatDate(deliveryTime)}</span>
    </div>
  );
}

export function OrderTime() {
  const currentTime = new Date().getTime();
  return (
    <div className="flex flex-row justify-between items-center ">
      <span>Order Time: </span>
      <span>{formatDate(currentTime)}</span>
    </div>
  );
}
async function getLocationInfo(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export function GetPosition() {
  const { confirm, inputValue, setInputValue } = useMenu();
  const [loading, setLoading] = useState(false);
  const handleInputValue = (e) => {
    const input = e.target.value;
    setInputValue(input);
  };
  const handleGetPosition = () => {
    setLoading(true);
    setInputValue("");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const locationInfo = await getLocationInfo(
              position.coords.latitude,
              position.coords.longitude
            );
            setLoading(false);
            if (!loading && locationInfo) {
              const street = locationInfo.address.road;
              const city = locationInfo.address.city;
              const postCode = locationInfo.address.postcode;
              const realPlace = `${street},${city},${postCode}`;
              setInputValue(realPlace);
            }
          } catch (error) {
            console.error("Error setting location");
            setLoading(false);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error(error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation not supported from this web");
      setLoading(false);
    }
  };

  return (
    <>
      <input
        className="w-96 border-gray-400"
        disabled={loading || confirm}
        value={inputValue || ""}
        onChange={handleInputValue}
        placeholder={loading ? "Loading..." : ""}
        type="text"
        required
      ></input>
      {confirm ? (
        ""
      ) : (
        <button
          disabled={confirm}
          onClick={handleGetPosition}
          className={`transform ${confirm ? "" : "active:scale-95"}`}
        >
          <GiPositionMarker size={30} />
        </button>
      )}
    </>
  );
}
