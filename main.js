const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const createBtn = document.getElementById('createBtn');
const clearBtn = document.querySelector('.clear');
// console.log(clearBtn);

let todos = JSON.parse(localStorage.getItem('todos')) || [];


// renderTodos
function renderTodos() {
    todoList.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const li = document.createElement('li');
        li.innerHTML = `
        <span>${todo.task}</span>
        <button class="check">${todo.completed ? 'Uncomplete' : 'Complete'}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;
        if (todo.completed) {
            li.classList.add('completed');
        }
        // checkBtn
        const checkBtn = li.querySelector('.check');
        checkBtn.addEventListener('click', () => {
            todo.completed = !todo.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            
            renderTodos();
        });
        // deleteBtn
        const deleteBtn = li.querySelector('.delete');
        deleteBtn.addEventListener('click', () => {
            todos.splice(i, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });
        // editBtn
        const editBtn = li.querySelector('.edit');
        editBtn.addEventListener('click', () => {
            const newTask = prompt('Enter the new task:');
            if (newTask) {
                todo.task = newTask;
                localStorage.setItem('todos', JSON.stringify(todos)); // localstorage saqlab ketadi har edit qilganida bolmasam refresh berganida oldingi holadiga qaytib qolar edi!
                renderTodos();
            }
        });
        // clearBtn
        clearBtn.addEventListener('click', () => {  
            todos.splice(i, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });
        todoList.appendChild(li);
    }
}


// createInput
function createInput() {
    createBtn.addEventListener('click', () => {
        const task = todoInput.value;
        if (task) {
            todos.push({ task, completed: false }); // bunda completed ni false qilish kerak bolmasam li elemntiga push bolganida completed bolib qolardi!
            localStorage.setItem('todos', JSON.stringify(todos));
            todoInput.value = '';
            renderTodos();
        }
         else if(todoInput.value.length == 0) {
            alert('Please Enter Valid Value!');
        }
    });
}

createInput();
renderTodos();



