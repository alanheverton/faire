function addTask(listId, task) {
    const list = document.getElementById(listId);
    const newTask = document.createElement("button");
    newTask.className = "task-button";
    newTask.addEventListener("click", function() {
      moveTask(this);
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = task;
    newTask.appendChild(textSpan);

    const icon = document.createElement("i");
    icon.className = "fas fa-arrow-right move-icon";
    newTask.appendChild(icon);

    list.appendChild(newTask);
    updateMoveIcon(newTask);
  }

  function updateMoveIcon(taskButton) {
const icon = taskButton.querySelector('.move-icon');
const currentList = taskButton.closest('.card').querySelector('div').id;

if (currentList === "to-do") {
  icon.className = "fas fa-arrow-right move-icon";
} else if (currentList === "in-progress") {
  icon.className = "far fa-circle move-icon";
} else if (currentList === "done") {
  icon.className = "fas fa-check move-icon";
}
}

  function moveTask(taskButton) {
    const currentList = taskButton.closest('.card').querySelector('div').id;
    let nextList;
    if (currentList === "to-do") {
      nextList = "in-progress";
    } else if (currentList === "in-progress") {
      nextList = "done";
    } else if (currentList === "done") {
      taskButton.classList.add("fade-out");
      setTimeout(() => {
        taskButton.remove();
      }, 500);
      return;
    }
    document.getElementById(nextList).appendChild(taskButton);
    updateMoveIcon(taskButton);
  }

  document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task) {
      addTask("to-do", task);
      taskInput.value = "";
    }
  });