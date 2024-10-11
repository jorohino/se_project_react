import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function SideBar({ handleEditUserClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.username}
        />
        <p className="sidebar__username">{currentUser.username}</p>
      </div>
      <button
        onClick={handleEditUserClick}
        type="button"
        className="sidebar__edit-profile"
      >
        Change profile data
      </button>
      <button onClick={handleSignOut} type="button" className="sidebar__logout">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
