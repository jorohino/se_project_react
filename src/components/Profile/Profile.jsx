import React from "react";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  handleAddClick,
  onCardClick,
  clothingItems,
  handleEditUserClick,
  handleSignOut,
  onCardLike,
  isLoggedIn,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditUserClick={handleEditUserClick}
          handleSignOut={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
};

export default Profile;
