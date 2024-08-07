import NavBar from "../component/NavBar";
import SideBar from "../component/SideBar";
import style from "./Menupage.module.css";
function Menu() {
  return (
    <div className={style.MenuPage}>
      <NavBar />
      <SideBar />
    </div>
  );
}

export default Menu;
