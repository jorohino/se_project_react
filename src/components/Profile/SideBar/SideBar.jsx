import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.username}
        />
        <p className="sidebar__username">{currentUser.username}</p>
      </div>
    </div>
  );
};

export default SideBar;
