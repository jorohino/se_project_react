import { Link } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleRegistration,
  navigateToLogin,
  onClose,
  isOpen,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="username"
          placeholder="Name"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="link"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
      <div className="register__button-container">
        <button type="submit" className="">
          Next
        </button>
        <button type="button" to="login" className="" onClick={navigateToLogin}>
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
