import React from "react";
import NavBar from "../component/NavBar";
import style from "./Homepage.module.css";
import { Link } from "react-router-dom";
import { useMenu } from "../component/MenuContext";
function Home() {
  const { isAuthenticated } = useMenu();
  return (
    <>
      <div className={style.homepage}>
        <NavBar />
        <section>
          <h1 className="text-shadow-xl">
            Welcome to Kunyao's fast food restaurant
          </h1>
          {isAuthenticated ? (
            ""
          ) : (
            <Link to="/account/login" className={style.cta}>
              {" "}
              Login / Sign Up{" "}
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

export default Home;
