// Seletores
const inputBox = document.querySelector(".input-box input");
const addBtn = document.querySelector(".input-box button");
const taskList = document.querySelector(".task-list");
const tabs = document.querySelectorAll(".tabs button");
const clearBtn = document.querySelector(".clear");
const footerCounter = document.querySelector(".footer span");

let filter = "all"; // all | active | completed

// Atualiza contador e visibilidade das tarefas
function updateTasks() {
  const tasks = taskList.querySelectorAll("li");
  let activeCount = 0;

  tasks.forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    if (!checkbox.checked) activeCount++;

    // filtro
    if (filter === "all") {
      task.style.display = "flex";
    } else if (filter === "active") {
      task.style.display = checkbox.checked ? "none" : "flex";
    } else if (filter === "completed") {
      task.style.display = checkbox.checked ? "flex" : "none";
    }
  });

  footerCounter.textContent = `${activeCount} items left`;
}

// Cria nova tarefa
function addTask(taskText) {
  if (taskText.trim() === "") return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = taskText;

  // Evento de marcar/desmarcar
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(label);

  taskList.appendChild(li);

  inputBox.value = "";
  updateTasks();
}

// Botão adicionar
addBtn.addEventListener("click", () => {
  addTask(inputBox.value);
});

// Enter no input
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(inputBox.value);
  }
});

// Tabs de filtro
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    filter = tab.textContent.toLowerCase();
    updateTasks();
  });
});

// Botão limpar concluídas
clearBtn.addEventListener("click", () => {
  const completedTasks = taskList.querySelectorAll("li.completed");
  completedTasks.forEach(task => task.remove());
  updateTasks();
});

// Inicializa contador
updateTasks();
