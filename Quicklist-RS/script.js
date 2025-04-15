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

function createNewItem(id, inputValue, inputChecked) {
  let newItem = document.createElement("li");
  newItem.innerHTML += `
    <div>
      <input type="checkbox" name="checkboxItem" id=${"checkboxItem" + id}
      ${inputChecked ? "checked" : ""}>
      <label for=${"checkboxItem" + id}>${inputValue}</label>
    </div> 
  `;
  newItem.classList.add("shoppingItem");
  newItem.id = id;

  let btnitem = document.createElement("button");
  btnitem.innerHTML += `
    <img src="assets/icons/delete.svg" alt="">
  `;
  btnItem.setAttribute("aria-label", "Deletar item");
  btnItem.onclick = () => deleteItem(id);

  newItem.appendChild(btnItem);
  shoppingList.append(newItem);

  list.push({
    id,
    name: inputValue,
    checked: inputChecked,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  const checkbox = newItem.children[0].children[0];
  checkbox.addEventListener("change", (e) => onChecked(id, e.target.checked));
}

function onChecked(id, checked) {
  const idx = list.findIndex(item => item.id === id);

  if(idx !== -1) {
    list[idx].checked = checked;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

function deleteItem(id) {
  if(timeoutId) {
    clearTimeout(timeoutId);
  }

  document.getElementById(id).remove();

  const newList = list.filter(item => item.id !== id);
  list = newList;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  message.style.display = "flex";

  timeoutId = setTimeout(() => {
    message.style.display = "none";
  }, 2500);
}

closeMessage.addEventListener("click", () => {
  message.style.display = "none"
});