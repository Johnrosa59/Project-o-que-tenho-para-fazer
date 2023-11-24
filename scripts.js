const inputToDo = document.querySelector("#input-to-do");
const buttonToDo = document.querySelector("#button-todo");
const listToDo = document.querySelector("#list-to-do");
let task;

let itemList = [];

function addToDo() {
  itemList.push({ task: inputToDo.value, finished: false });

  itemList.forEach((item) => {
    if (item.task === "") {
      alert("Não se pode adicionar tarefa em branco");
      itemList.pop();
    }
  });

  showTasks();
}

function showTasks() {
  let newLi = "";

  itemList.forEach((item, index) => {
    newLi =
      newLi +
      `<li class="to-do ${item.finished && "done"}">
                    <img src="./assets/Certo.png" id="img-right" onclick="finishedTask(${index})" /><p>${
        item.task
      }</p>
                    <img src="./assets/Lixeira.png" id="img-trash" onclick="deleteItem(${index})" ></li>
             </li>`;
  });

  listToDo.innerHTML = newLi;

  localStorage.setItem("list", JSON.stringify(itemList));
}

function finishedTask(index) {
  itemList[index].finished = !itemList[index].finished;
  showTasks();
}

function deleteItem(index) {
  itemList.splice(index, 1);
  showTasks();
}

function loadTasks() {
  const taskFromLocalStorage = localStorage.getItem("list");
  if (taskFromLocalStorage) {
    itemList = JSON.parse(taskFromLocalStorage);
  }
  showTasks();
}

loadTasks();
buttonToDo.addEventListener("click", addToDo);
