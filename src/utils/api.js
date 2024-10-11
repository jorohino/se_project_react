import { checkResponse } from "./utils";

const baseUrl = "http://localhost:3001";

function getHeaders(token) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }, token) {
  console.log("Data being sent to the server: ", { name, imageUrl, weather });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(checkResponse);
}

function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getHeaders(token),
  }).then(checkResponse);
}

function updateUserInfo(user, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({
      username: user.username,
      avatar: user.avatar,
    }),
  });
}

export { getItems, addItem, deleteItem, getUserInfo, baseUrl, updateUserInfo };
