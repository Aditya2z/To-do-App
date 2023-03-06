function main() {
    
let root = document.querySelector(".root");
let todoList = [];
let inputCounter = 0;

if(Boolean(localStorage.todoList)) {
       todoList = JSON.parse(localStorage.getItem("todoList"));
       inputCounter = localStorage.inputCounter;
       createUI(todoList, root);
}

function handleToggle(event) {
    let id = event.target.dataset.id;
    let toggleElement = todoList.filter(todo => Number(todo.id) === Number(id));
    toggleElement.map(todo => todo.isDone = !todo.isDone);
    
    createUIforSelectedBtn(); 
    localStorage.todoList = JSON.stringify(todoList);
}

function handleDelete(event) {
    let id = event.target.dataset.id;
    todoList = todoList.filter(todo => Number(todo.id) !== Number(id));

    createUIforSelectedBtn();
    localStorage.todoList = JSON.stringify(todoList);
}

function createUI(data, rootElm) {

    rootElm.innerHTML = "";

    data.forEach((todo) => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isDone;
        checkbox.setAttribute("data-id", todo.id);
    
        let text = document.createElement("p");
        text.innerText = todo.name;
    
        let closeBtn = document.createElement("span");
        closeBtn.classList.add("closeBtn");
        closeBtn.innerText = "X";
        closeBtn.setAttribute("data-id", todo.id);
    
        let li = document.createElement("li");
        li.append(checkbox, text, closeBtn);

        if(todo.isDone === true) {
            li.style.opacity = ".75";
            text.style.textDecoration = "line-through";
          };

        rootElm.append(li);

        checkbox.addEventListener("change", handleToggle);
        closeBtn.addEventListener("click", handleDelete);
       
    });

};


function handleInput(event) {
    if( (event.keyCode === 13 && event.target.value !== "") ||
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

let inputValue = document.querySelector("input[type=text]");
inputValue.addEventListener("keyup", handleInput);
let enterBtn = document.querySelector(".enterBtn");
enterBtn.addEventListener("touchstart", handleInput);

let active = document.querySelector(".active-btn");
let completed = document.querySelector(".completed-btn");
let all = document.querySelector(".all-btn");
let clear = document.querySelector(".clear-btn");

let defaultSelectedBtn = all;
let defaultSelectedData = [];
createUIforSelectedBtn();

function createUIforSelectedBtn(btn = defaultSelectedBtn) {
    all.classList.remove("selected"); 
    active.classList.remove("selected"); 
    completed.classList.remove("selected");


    if(btn === all) {
        all.classList.add("selected");
        defaultSelectedData = todoList;
    }
    if(btn === active) {
        active.classList.add("selected");
        defaultSelectedData = todoList.filter(ele => ele.isDone === false);
    }
    if(btn === completed) {
        completed.classList.add("selected");
        defaultSelectedData = todoList.filter(ele => ele.isDone === true);
    }

    createUI(defaultSelectedData, root);
}

active.addEventListener("click", function(event) {
    defaultSelectedBtn = event.target;
    createUIforSelectedBtn();
});

completed.addEventListener("click", function(event) {
    defaultSelectedBtn = event.target;
    createUIforSelectedBtn();
});

all.addEventListener("click", function(event) {
    defaultSelectedBtn = event.target;
    createUIforSelectedBtn();
});

function handleSelectAll() {
    let arr = [];
    todoList.forEach(todo => arr.push(todo.isDone));
    if(arr.includes(false)) {
         todoList.forEach(todo => todo.isDone = true);
    } else {
        todoList.forEach(todo => todo.isDone = false);
    }
    defaultSelectedBtn = all;
    createUIforSelectedBtn();
    localStorage.todoList = JSON.stringify(todoList);
};

let selectAll = document.querySelector(".selectAll");
selectAll.addEventListener("click", handleSelectAll);


function handleClear() {
    defaultSelectedBtn = all;
    todoList = todoList.filter(todo => todo.isDone === false);
    createUIforSelectedBtn();
    localStorage.todoList = JSON.stringify(todoList);
}

clear.addEventListener("click", handleClear);

};

main();

