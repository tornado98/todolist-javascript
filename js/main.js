// get todos from localStorage
let todos = localStorage.getItem("todos");

// try pars data or null
try {
    todos = JSON.parse(todos);
    todos = todos.length ? todos : null;
} catch (e) {
    todos = null;
}

// set default value if todos == null
if (!todos) {
    todos = [
        { content: "shopping", status: true },
        { content: "Watch videos", status: false },
        { content: "Like videos", status: true }
    ];
    localStorage.setItem("todos", JSON.stringify(todos));
}

// func to create update todos list in ui
function createTodos(todos) {
    let todosList = document.querySelector("#todos-list");
    todosList.innerHTML = "";

    //create list tag forEach todo
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        let content = document.createElement("span");
        content.textContent = todo.content;
        content.style.textDecoration = todo.status ? "initial" : 'line-through';
        let deleteBtn = document.createElement("i");
        deleteBtn.className = "fa fa-trash float-right";
        deleteBtn.style = "aria-hidden='true'";

        //append content and deleteBtn to li
        li.append(content);
        li.append(deleteBtn);

        //append li to todosList
        todosList.append(li);

        // add deleteBtn functionality
        deleteBtn.addEventListener("click", e => {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            createTodos(todos);
        });
        // add complete functionality
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status;
            localStorage.setItem("todos", JSON.stringify(todos));
            createTodos(todos);
        });
    });

}

createTodos(todos);

// action add & search

let action = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");

Array.from(action.children).forEach(action => {
    // add todo
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
            <form id="add">
                <input type="text" class="form-control mb-1" name="add" placeholder="Add todo:">
            </form>
            `;
            createTodos(todos);
            let add = document.querySelector("#add");
            add.addEventListener("submit", e => {
                e.preventDefault();
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true });
                    localStorage.setItem("todos", JSON.stringify(todos));
                    createTodos(todos);
                    add.textContent = "";
                }
            });
        });
        // search todo
    } else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
            <form id="search">
                <input type="text" class="form-control" name="search" placeholder="search todo:">
            </form>
            `
            let search = document.querySelector("#search");
            search.addEventListener("submit", e => { e.preventDefault(); });
            search.addEventListener("keyup", e => {
                e.preventDefault();
                if (search.search.value) {
                    let filterd_Todos = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    );
                    createTodos(filterd_Todos);
                } else {
                    createTodos(todos);
                }


            });
        });
    }
});