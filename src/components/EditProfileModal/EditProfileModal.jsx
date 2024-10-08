import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export const EditProfileModal = ({
  closeActiveModal,
  isOpen,
  handleEditUser,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: currentUser.username || "",
    avatar: currentUser.avatar || "",
  });

  useEffect(() => {
    if (isOpen) {
      setData({
        name: currentUser.username || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    handleEditUser(data);
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="username"
          required
          placeholder="Name"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{" "}
        <input
          type="link"
          className="modal__input"
          id="avatar"
          required
          placeholder="Avatar URL"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="modal__edit-submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
