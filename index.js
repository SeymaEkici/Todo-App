const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

document.addEventListener("DOMContentLoaded", function () {
    updateTodoList();
});

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
        
        // Checkbox değişim olayını ekleme
        const checkbox = todoItem.querySelector(".todo-checkbox");
        const img = todoItem.querySelector(".checkbox-icon");

        checkbox.addEventListener("change", function () {
            img.src = this.checked ? "icons/Tic-icon.svg" : "icons/Non-Tic-icon.svg";
        });
    });
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" class="todo-checkbox">
        <label class="custom-checkbox" for="${todoId}">
            <img src="icons/Non-Tic-icon.svg" alt="Checkbox Icon" width="20" class="checkbox-icon">
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <img src="icons/Delete-icon.svg" alt="Delete Icon" width="18">
        </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}