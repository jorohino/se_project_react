import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-place">
        {currentDate}, {weatherData.location}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user">
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            className="header__user-pfp"
            src={avatar}
            alt="Terrence Tegegne"
          ></img>
        </div>
      </Link>
    </header>
  );
}

export default Header;
