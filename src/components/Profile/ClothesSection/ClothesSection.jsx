import React from "react";
import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

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
          const isOwn = item.owner === currentUser._id;

          const itemCardClassName = `clothes-section__items ${
            isOwn
              ? "clothes-section__items_visible"
              : "clothes-section__items_hidden"
          }`;

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
