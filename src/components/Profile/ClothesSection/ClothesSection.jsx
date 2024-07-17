import React from "react";
import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";
import { defaultClothingItems } from "../../../utils/constants";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header-wrapper">
        <p className="clothes-section__header">Your Items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onCardClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
