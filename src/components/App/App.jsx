import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import * as token from "../../utils/token";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem, getUserInfo } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    location: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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

    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setToken(data.token);
          api.getUserInfo(data.token).then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/profile");
          });
        }
      })
      .catch((err) => console.error("Login failed: ", err));
  };

  useEffect(() => {
    const jwt = token.getToken();

    if (!jwt) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Token validation failed: ", err);
        setIsLoggedIn(false);
        token.removeToken();
      });
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const onDeleteItem = (id) => {
    return deleteItem(id)
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

  const onAddItem = (values) => {
    return addItem(values)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
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
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
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
