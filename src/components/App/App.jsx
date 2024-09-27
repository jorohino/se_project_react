import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

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
import { getItems, addItem, deleteItem } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //TODO: const [userData, setUserData] = useState({})

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    location: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleLogin = ({ email, password }) => {
    if (!username || !password) {
      return;
    }

    /*auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt);
        setUserData(data.user);
        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname
      }) */
  };

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

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
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
