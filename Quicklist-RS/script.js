const formList = document.querySelector("#formList");
const newitemInput = document.querySelector("#newItemInput");
const shoppingList = document.querySelector("#shoppingList")
const message = document.querySelector("#alert");
const closeMessage = document.querySelector("#closeAlert");

let list = [];
const STORAGE_KEY = "shoppingList";

let itemId = 1;
let timeoutId;

document.addEventListener("DOMContentLoaded", () => {
  const storageList = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (storageList) {
    storageList.forEach(item => {
      itemId = item.id + 1;
      createNewItem(item.id, item.name, item.checked);
    });
  }
});

formList.addEventListener("submit", (event) => {
  event.preventDefault();

  if (newitemInput.value !== "") {
    createNewItem(itemId, newitemInput.value, false);
    itemId += 1;

    newitemInput.value = "";
    newitemInput.focus();

  } else {
    alert("Oitem deve possuir um nome!")
  }
});