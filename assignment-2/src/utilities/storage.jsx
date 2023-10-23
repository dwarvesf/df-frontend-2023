//! saveToStorage func
//! function is used to store the Books into LocalStorage
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//! saveToStorage
//! function is used to get (fetch) the Books from LocalStorage
export function getFromLocalStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
  } catch (error) {
    console.log("Error: ", error);
  }
}

//! deleteLocalStorage
//! function is used to delete the Books from LocalStorage, and convert JSON automatically
export function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}
