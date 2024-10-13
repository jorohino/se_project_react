import { checkResponse } from "./utils";

const baseUrl = "http://localhost:3001";

function getHeaders(token) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }, token) {
  console.log("Data being sent to the server: ", { name, imageUrl, weather });
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
}

function getUserInfo(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

function updateUserInfo(user, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({
      username: user.username,
      avatar: user.avatar,
    }),
  });
}

function addCardLike(cardId, token) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: getHeaders(token),
  });
}

function removeCardLike(cardId, token) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  baseUrl,
  updateUserInfo,
  addCardLike,
  removeCardLike,
};
