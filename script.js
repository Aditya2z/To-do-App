function main() {

    let root = document.querySelector(".root");
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    let inputCounter = localStorage.inputCounter || 0;
    createUI(todoList, root);

    let inputValue = document.querySelector("input[type=text]");
    let active = document.querySelector(".active-btn");
    let completed = document.querySelector(".completed-btn");
    let all = document.querySelector(".all-btn");
    let clear = document.querySelector(".clear-btn");
    let selectAll = document.querySelector(".selectAll");

    let enterBtn = document.querySelector(".enterBtn");

    // Function to mark todo as done
    function markTodo(event) {
        let id = event.target.dataset.id;
        let toggleElement = todoList.filter(todo => todo.id == id);
        toggleElement.map(todo => todo.isDone = !todo.isDone);

        createUIforSelectedBtn();
        localStorage.todoList = JSON.stringify(todoList);
    }

    // Function to delete todo
    function deleteTodo(event) {
        let id = event.target.dataset.id;
        todoList = todoList.filter(todo => todo.id != id);

        createUIforSelectedBtn();
        localStorage.todoList = JSON.stringify(todoList);
    }

    // Functions to create UI for every todo
    function createCheckbox(todo) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isDone;
        checkbox.setAttribute("data-id", todo.id);

        checkbox.addEventListener("change", markTodo);
        return checkbox;
    }

    function createTodoText(todo) {
        let text = document.createElement("p");
        text.innerText = todo.name;

        if (todo.isDone === true) {
            text.style.textDecoration = "line-through";
        };
        
        return text;
    }

    function createCloseBtn(todo) {
        let closeBtn = document.createElement("span");
        closeBtn.classList.add("closeBtn");
        closeBtn.innerText = "X";
        closeBtn.setAttribute("data-id", todo.id);

        closeBtn.addEventListener("click", deleteTodo);
        return closeBtn;
    }

    // Function to create todo list UI
    function createUI(data, rootElm) {

        rootElm.innerHTML = "";

        data.forEach((todo) => {
            let li = document.createElement("li");
            li.append(  createCheckbox(todo),
                        createTodoText(todo),
                        createCloseBtn(todo)
                    );

            if (todo.isDone === true) {
                li.style.opacity = ".75";
            };

            rootElm.append(li);
        });

    };

    // Function to create todo every time user enters a value
    function createTodo(event) {
        if ((event.keyCode === 13 && event.target.value !== "") ||
            (event.target === enterBtn && event.target.value !== "")
        ) {
            let todo = {
                name: event.target.value,
                isDone: false,
                id: inputCounter,
            };
            todoList.push(todo);
            event.target.value = "";

            createUI(todoList, root);
            inputCounter++;

            localStorage.todoList = JSON.stringify(todoList);
            localStorage.inputCounter = inputCounter;
        }

    };

    // Function to select all Todos
    function selectAllTodos() {
        let arr = [];
        todoList.forEach(todo => arr.push(todo.isDone));
        if (arr.includes(false)) {
            todoList.forEach(todo => todo.isDone = true);
        } else {
            todoList.forEach(todo => todo.isDone = false);
        }
        defaultSelectedBtn = all;
        createUIforSelectedBtn();
        localStorage.todoList = JSON.stringify(todoList);
    };

    // Function to clear all completed todos
    function clearCompletedTodo() {
        defaultSelectedBtn = all;
        todoList = todoList.filter(todo => todo.isDone === false);
        createUIforSelectedBtn();
        localStorage.todoList = JSON.stringify(todoList);
    }

    // Function for updating UI as per selected button
    let defaultSelectedBtn = all;
    let defaultSelectedData = [];
    createUIforSelectedBtn();

    function createUIforSelectedBtn(btn = defaultSelectedBtn) {
        all.classList.remove("selected");
        active.classList.remove("selected");
        completed.classList.remove("selected");


        if (btn === all) {
            all.classList.add("selected");
            defaultSelectedData = todoList;
        }
        if (btn === active) {
            active.classList.add("selected");
            defaultSelectedData = todoList.filter(ele => ele.isDone === false);
        }
        if (btn === completed) {
            completed.classList.add("selected");
            defaultSelectedData = todoList.filter(ele => ele.isDone === true);
        }

        createUI(defaultSelectedData, root);
    }


    // Add Event listeners
    inputValue.addEventListener("keyup", createTodo);
    enterBtn.addEventListener("click", createTodo);
    selectAll.addEventListener("click", selectAllTodos);
    clear.addEventListener("click", clearCompletedTodo);

    active.addEventListener("click", function (event) {
        defaultSelectedBtn = event.target;
        createUIforSelectedBtn();
    });

    completed.addEventListener("click", function (event) {
        defaultSelectedBtn = event.target;
        createUIforSelectedBtn();
    });

    all.addEventListener("click", function (event) {
        defaultSelectedBtn = event.target;
        createUIforSelectedBtn();
    });
    
};

main();

