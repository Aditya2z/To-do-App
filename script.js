function main() {
    

let root = document.querySelector(".root");

let todoList = [];
let localStorageList = JSON.parse(localStorage.getItem("todoList"));

if(Boolean(localStorageList) !== false) {
    todoList = localStorageList.filter(ele => ele !== null);
    createUI(todoList, root);
} else {
    todoList = [];
};


function handleInput(event) {
    if(event.keyCode === 13 && event.target.value !== "") {
        let todo = {
            name: event.target.value,
            isDone: false,
        };
        todoList.push(todo);

    event.target.value = "";

    createUI(todoList, root);

    localStorage.todoList = JSON.stringify(todoList);
    }
    
};

let inputValue = document.querySelector("input[type=text]");
inputValue.addEventListener("keyup", handleInput);

function handleToggle(event) {
    let id = event.target.dataset.id;
    todoList[id].isDone = !todoList[id].isDone;
    createUI(todoList, root);

    localStorage.todoList = JSON.stringify(todoList);
}

function handleDelete(event) {
    let id = event.target.dataset.id;
    todoList.splice(id, 1);

    createUI(todoList, root);

    localStorage.todoList = JSON.stringify(todoList);
}


function createUI(data = todoList, rootElm) {

    rootElm.innerHTML = "";

    data.forEach((todo, index) => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isDone;
        checkbox.setAttribute("data-id", index);
    
        let text = document.createElement("p");
        text.innerText = todo.name;
    
        let close = document.createElement("span");
        close.classList.add("close");
        close.innerText = "X";
        close.setAttribute("data-id", index);
    
        let li = document.createElement("li");
        li.append(checkbox, text, close);

        if(todo.isDone === true) {
            li.style.opacity = ".75";
            text.style.textDecoration = "line-through";
          };

        rootElm.append(li);

        checkbox.addEventListener("change", handleToggle);
        close.addEventListener("click", handleDelete);   
    });

};



function handleSelectAll() {
    let arr = [];
    todoList.forEach(todo => arr.push(todo.isDone));
    if(arr.includes(false)) {
         todoList.forEach(todo => todo.isDone = true);
    } else {
        todoList.forEach(todo => todo.isDone = false);
    }

    createUI(todoList, root);

    localStorage.todoList = JSON.stringify(todoList);
};

let selectAll = document.querySelector(".selectAll");
selectAll.addEventListener("click", handleSelectAll);

function handleActive() {
    let arr = todoList.filter(ele => ele.isDone === false);
    createUI(arr, root);
}

let active = document.querySelector(".active-btn");
active.addEventListener("click", handleActive);

function handleCompleted() {
    let arr = todoList.filter(ele => ele.isDone === true);
    createUI(arr, root);
}

let completed = document.querySelector(".completed-btn");
completed.addEventListener("click", handleCompleted);

function handleAll() {
    createUI(todoList, root);
}

let all = document.querySelector(".all-btn");
all.addEventListener("click", handleAll);

function handleClear() {
    todoList.forEach((ele, index) => {
        if(ele.isDone === true) delete todoList[index];
})
createUI(todoList, root);

localStorage.todoList = JSON.stringify(todoList);
}

let clear = document.querySelector(".clear-btn");
clear.addEventListener("click", handleClear);


};

main();