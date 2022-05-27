// Theme toggle
const theme = document.querySelector(".theme");
theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

const active = document.querySelector(".active");
const complete = document.querySelector(".complete");
const all = document.querySelector(".all");
//
active.addEventListener("click", () => {
  active.classList.add("current");
  complete.classList.remove("current");
  all.classList.remove("current");
});
complete.addEventListener("click", () => {
  complete.classList.add("current");
  active.classList.remove("current");
  all.classList.remove("current");
});
all.addEventListener("click", () => {
  all.classList.add("current");
  complete.classList.remove("current");
  active.classList.remove("current");
});

//
//
const input = document.querySelector("#input");
const list = document.querySelector(".list");
const empty = document.querySelector(".empty");
const item = document.querySelectorAll(".item");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    all.classList.add("current");
    complete.classList.remove("current");
    active.classList.remove("current");

    if (input.value) {
      let newItem = document.createElement("div");
      newItem.classList = "item";

      // Date.now() generates unique id for the checkboxes
      newItem.innerHTML = `<label for="${Date.now()}">${input.value}</label>`;

      // Adds the new Item to the list
      list.appendChild(newItem);

      // Creates and adds checkbox
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", Date.now());
      checkbox.setAttribute("name", "list");
      newItem.prepend(checkbox);

      // Creates and adds remove button
      const img = document.createElement("img");
      img.src = "./images/icon-cross.svg";
      img.classList.add("remove");
      newItem.appendChild(img);

      // Gives the number of items left (Unchecked)
      const left = document.getElementById("items-left");
      const allCheckboxes = [
        ...document.querySelectorAll("input[type='checkbox']"),
      ];
      const checkedItems = [
        ...document.querySelectorAll("input[type='checkbox']:checked"),
      ];
      left.textContent = allCheckboxes.length - checkedItems.length;

      // Reduces the number of items left when an item is checked
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          left.textContent--;
        } else {
          left.textContent++;
        }
      });

      img.addEventListener("click", () => {
        // Removes item from list
        list.removeChild(newItem);
        if (!img.previousSibling.previousSibling.checked) left.textContent--;
      });

      // Resets the input field
      input.value = "";
    }
  }

  // Removes checked items
  const clearCompleted = document.querySelector(".clear");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  clearCompleted.addEventListener("click", () => {
    checkboxes.forEach((e) => {
      if (e.checked) {
        e.parentElement.remove();
      }
    });
  });

  // Displays all items
  all.addEventListener("click", () => {
    all.classList.add("current");
    checkboxes.forEach((e) => {
      e.parentElement.style.display = "grid";
    });
  });

  //  Displays only active items
  active.addEventListener("click", () => {
    checkboxes.forEach((e) => {
      if (e.checked) {
        e.parentElement.style.display = "none";
      }
      if (!e.checked) {
        e.parentElement.style.display = "grid";
      }
    });
  });

  // Displays only completed items
  complete.addEventListener("click", () => {
    complete.classList.add("current");
    checkboxes.forEach((e) => {
      if (!e.checked) {
        e.parentElement.style.display = "none";
      }
      if (e.checked) {
        e.parentElement.style.display = "grid";
      }
    });
  });
});
