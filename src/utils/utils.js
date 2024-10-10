export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    console.log(res);
    return Promise.reject(`Error: ${res.status}`);
  }
}
