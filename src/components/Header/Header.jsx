import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);

  const isLoggedIn = true;

  const userInitial = currentUser.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

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
        className={`header__add-clothes-btn ${
          !isLoggedIn ? "header__button_hidden" : ""
        }`}
      >
        +Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user">
          <p className="header__user-name">
            {isLoggedIn ? currentUser.username : "Guest"}
          </p>
          {isLoggedIn && currentUser.avatar ? (
            <img
              className="header__user-pfp"
              src={avatar}
              alt="Terrence Tegegne"
            ></img>
          ) : (
            <div className="header__user-placeholder">{userInitial}</div>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
