import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR logo" />
      <p className="header__date-place">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+Add clothes</button>
      <div className="header__user">
        <p className="header__user-name">Terrence Tegegne</p>
        <img
          className="header__user-pfp"
          src={avatar}
          alt="Terrence Tegegne"
        ></img>
      </div>
    </header>
  );
}

export default Header;