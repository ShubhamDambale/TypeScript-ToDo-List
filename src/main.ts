import './style.css';

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];
const todoContainer = document.querySelector(".todoConatiner") as HTMLDivElement;
const todoInput = document.querySelector("input") as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo();
};

const generateTodoItems = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  // Creating A CheckBox
  const checkbox: HTMLInputElement = document.createElement("input")
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted"
  checkbox.checked = isCompleted;
  checkbox.style.marginRight = "10px";
  checkbox.onchange = () => {
    const textElement = checkbox.nextElementSibling as HTMLElement; // Rename variable to textElement
    textElement.classList.toggle("text-crossed"); // Toggle class name 'text-crossed'
  }

  // Creating P for Title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;

  // Creating Delete Button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "Delete"
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  }

  // Appending All Todo Items
  todo.append(checkbox, paragraph, btn);
  todoContainer.append(todo);
}

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo();
}

const renderTodo = () => {
  todoContainer.innerText = "";
  todos.forEach(item => {
    generateTodoItems(item.title, item.isCompleted, item.id);
  });
}

