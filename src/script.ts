function addTask(listId: string, task: string): void {
    const list = document.getElementById(listId) as HTMLElement;
    const newTask = document.createElement("button");
    newTask.className = "task-button";
  
    newTask.addEventListener("click", function () {
      moveTask(newTask);
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
  
  function updateMoveIcon(taskButton: HTMLButtonElement): void {
    const icon = taskButton.querySelector('.move-icon') as HTMLElement;
    const currentList = taskButton.closest('.card')?.querySelector('div')?.id;
  
    if (currentList === "to-do") {
      icon.className = "fas fa-arrow-right move-icon";
    } else if (currentList === "in-progress") {
      icon.className = "far fa-circle move-icon";
    } else if (currentList === "done") {
      icon.className = "fas fa-check move-icon";
    }
  }
  
  function moveTask(taskButton: HTMLButtonElement): void {
    const currentList = taskButton.closest('.card')?.querySelector('div')?.id;
    let nextList: string | undefined;
  
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
  
    if (nextList) {
      const nextListElement = document.getElementById(nextList);
      if (nextListElement) {
        nextListElement.appendChild(taskButton);
        updateMoveIcon(taskButton);
      }
    }
  }
  
  document.getElementById("task-form")?.addEventListener("submit", function (event: Event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input") as HTMLInputElement;
    const task = taskInput.value.trim();
    if (task) {
      addTask("to-do", task);
      taskInput.value = "";
    }
  });
  