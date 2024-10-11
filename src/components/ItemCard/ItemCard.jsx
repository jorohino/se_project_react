import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked
      ? "item-card__like-button_active"
      : "item-card__like-button_inactive"
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.preventDefault();
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  console.log("Is User Logged In?", isLoggedIn);
  console.log("Likes array: ", item.likes);
  console.log("Current user ID: ", currentUser._id);
  console.log("Current user in context: ", currentUser);

  return (
    <li className="item-card">
      <div className="item-card__name-frame">
        <h2 className="item-card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
      />
    </li>
  );
}

export default ItemCard;
