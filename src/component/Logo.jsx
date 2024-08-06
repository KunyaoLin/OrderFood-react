import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img className="h-20" src="/logo.png" alt="Kunyao Restaurant Logo"></img>
    </Link>
  );
}

export default Logo;
