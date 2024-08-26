function addTask(listId, task) {
  const list = document.getElementById(listId); // Obtém a lista (coluna) onde a tarefa será adicionada
  const newTask = document.createElement("button"); // Cria um novo botão para representar a tarefa
  newTask.className = "task-button"; // Adiciona uma classe para estilizar o botão da tarefa
  newTask.addEventListener("click", function() {
    moveTask(this); // Adiciona um evento de clique para mover a tarefa entre as listas
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = task; // Define o texto da tarefa
  newTask.appendChild(textSpan); // Adiciona o texto ao botão da tarefa

  const icon = document.createElement("i");
  icon.className = "fas fa-arrow-right move-icon"; // Ícone padrão para indicar movimento
  newTask.appendChild(icon); // Adiciona o ícone ao botão da tarefa

  list.appendChild(newTask); // Adiciona o novo botão de tarefa à lista (coluna) correspondente
  updateMoveIcon(newTask); // Atualiza o ícone da tarefa de acordo com a lista onde ela está
}

function updateMoveIcon(taskButton) {
  const icon = taskButton.querySelector('.move-icon'); // Seleciona o ícone de movimento dentro do botão da tarefa
  const currentList = taskButton.closest('.card').querySelector('div').id; // Obtém o ID da lista atual onde a tarefa está

  // Atualiza o ícone com base na lista atual da tarefa
  if (currentList === "to-do") {
    icon.className = "fas fa-arrow-right move-icon"; // Ícone para tarefas na lista "A fazer"
  } else if (currentList === "in-progress") {
    icon.className = "far fa-circle move-icon"; // Ícone para tarefas na lista "Em andamento"
  } else if (currentList === "done") {
    icon.className = "fas fa-check move-icon"; // Ícone para tarefas na lista "Concluídas"
  }
}

function moveTask(taskButton) {
  const currentList = taskButton.closest('.card').querySelector('div').id; // Identifica a lista atual onde a tarefa está
  let nextList;

  // Define a próxima lista com base na lista atual
  if (currentList === "to-do") {
    nextList = "in-progress"; // Move de "A fazer" para "Em andamento"
  } else if (currentList === "in-progress") {
    nextList = "done"; // Move de "Em andamento" para "Concluídas"
  } else if (currentList === "done") {
    taskButton.classList.add("fade-out"); // Adiciona uma animação de desaparecimento
    setTimeout(() => {
      taskButton.remove(); // Remove a tarefa após a animação
    }, 500);
    return;
  }

  document.getElementById(nextList).appendChild(taskButton); // Move a tarefa para a próxima lista
  updateMoveIcon(taskButton); // Atualiza o ícone da tarefa na nova lista
}

document.getElementById("task-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim(); // Obtém e limpa o valor do campo de entrada de tarefas
  if (task) {
    addTask("to-do", task); // Adiciona a nova tarefa à lista "A fazer"
    taskInput.value = ""; // Limpa o campo de entrada após adicionar a tarefa
  }
});
