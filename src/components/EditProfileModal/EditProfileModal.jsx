import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export const EditProfileModal = ({ onClose, isOpen, handleEditUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    username: currentUser.username || "",
    avatar: currentUser.avatar || "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setData({
        username: currentUser.username || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    const isFormValid = data.username && data.avatar;
    setIsButtonDisabled(!isFormValid);
  }, [data]);

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
      onClose={onClose}
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
      <button
        type="submit"
        className={`modal__edit-submit ${
          isButtonDisabled ? "modal__edit-submit_disabled" : ""
        }`}
        disabled={isButtonDisabled}
      >
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
