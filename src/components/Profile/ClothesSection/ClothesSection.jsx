import React from "react";
import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = clothingItems?.filter(
    (item) => item.owner === currentUser?._id
  );

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemCardClassName = `clothes-section__items ${
    isOwn ? "clothes-section__items_visible" : "clothes-section__items_hidden"
  }`;

  return (
    <div className="clothes-section">
      <div className="clothes-section__header-wrapper">
        <p className="clothes-section__header">Your Items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              className={itemCardClassName}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
