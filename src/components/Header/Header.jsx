import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleSignUpClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);

  const userInitial = currentUser?.username
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
      {isLoggedIn ? (
        <Link to="/profile" className="header__link">
          <div className="header__user">
            <p className="header__user-name">
              {isLoggedIn && currentUser?.username
                ? currentUser.username
                : "Guest"}
            </p>
            {isLoggedIn && currentUser?.avatar ? (
              <img
                className="header__user-pfp"
                src={currentUser.avatar}
                alt={currentUser.username}
              ></img>
            ) : (
              <div className="header__user-placeholder">{userInitial}</div>
            )}
          </div>
        </Link>
      ) : (
        <div className="header__buttons-container">
          <button
            className="header__signup-button"
            type="button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
          <button
            className="header__login-button"
            type="button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
