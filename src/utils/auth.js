import { baseUrl } from "./api";
import { checkResponse } from "./utils";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const register = (email, password, username, avatar) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username, avatar }),
  });
};

export const authorize = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
