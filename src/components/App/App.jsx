// External Library + Context Imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Utility Imports
import * as auth from "../../utils/auth";
import * as token from "../../utils/token";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import * as api from "../../utils/api";
import { APIkey, coordinates } from "../../utils/constants";

// Primary Component Imports
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

// Modal Component Imports
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

// Style Imports
import "./App.css";

function App() {
  // State + Context Setup
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    email: "",
    avatar: "",
  });

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    location: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  // Navigation Setup
  const navigate = useNavigate();

  // Authentication Handlers
  const handleRegistration = ({ email, password, username, avatar }) => {
    return auth
      .register(email, password, username, avatar)
      .then(() => {
        handleLogin({ email, password });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          token.setToken(data.token);
          api.getUserInfo(data.token).then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
            console.log("User logged in status:", true);
            closeActiveModal();
            navigate("/profile");
          });
        }
      })
      .catch((err) => console.error("Login failed: ", err));
  };

  const handleSignOut = () => {
    token.removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({
      _id: "",
      username: "",
      email: "",
      avatar: "",
    });
  };

  // User + Modal Management
  const handleEditUser = (data) => {
    const jwt = token.getToken();
    return api
      .updateUserInfo(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // Navigation Handlers
  const navigateToLogin = () => {
    closeActiveModal();
    setActiveModal("login");
  };

  const navigateToRegister = () => {
    closeActiveModal();
    setActiveModal("register");
  };

  // UI Interaction Handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditUserClick = () => {
    setActiveModal("edit-profile");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  // Card Interaction Handlers
  const onAddItem = (values) => {
    const jwt = token.getToken();
    console.log("Values being passed to addItem: ", values);
    return api
      .addItem(values, jwt)
      .then((newItem) => {
        console.log("Item added successfully: ", newItem);
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log("Error in onAddItem: ", err);
      });
  };

  const onDeleteItem = (id) => {
    const jwt = token.getToken();

    return api
      .deleteItem(id, jwt)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = token.getToken("jwt");

    if (!jwt) {
      console.error("JWT token is missing, unable to like the card.");
      return;
    }

    !isLiked
      ? api
          .addCardLike(id, jwt)
          .then((updatedCard) => {
            console.log("Updated card after liking:", updatedCard);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log("Error liking the card:", err))
      : api
          .removeCardLike(id, jwt)
          .then((updatedCard) => {
            console.log("Updated card after unliking:", updatedCard);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log("Error unliking the card:", err));
  };

  // API Data Fetching
  useEffect(() => {
    const jwt = token.getToken();
    console.log("JWT token on load:", jwt);

    if (!jwt) {
      console.log("JWT not found, user is not logged in.");
      return;
    }

    api
      .getUserInfo(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        console.log("User re-authenticated on page load.");
        console.log("User data on load:", userData);
        api.getUserInfo(jwt).then((userData) => {
          console.log("User data from API:", userData); // Check if _id is present
          setCurrentUser(userData);
        });
      })
      .catch((err) => {
        console.error("Error re-authenticating user:", err);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditUserClick={handleEditUserClick}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            navigateToLogin={navigateToLogin}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            navigateToRegister={navigateToRegister}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            handleEditUser={handleEditUser}
          />
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteClick}
          />
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm-delete"}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            onDeleteItem={onDeleteItem}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
