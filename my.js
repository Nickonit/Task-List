//DEFINE ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all Event listeners
loadEventListeners();

//load All event listeners
function loadEventListeners(){
    //Dom Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //all task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //Clear the Task
        clearBtn.addEventListener('click', clearTasks);
     //Filter the task
    filter.addEventListener('keyup', filterTask);

}

// Get tasks Loaded into ul
    function getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks=[];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task) {
            //create li element
            const li = document.createElement('li');
            //add Class
            li.className = 'collection-item';
            //crete text node and append to the li
            li.appendChild(document.createTextNode(task));
            //create new link element
            const link = document.createElement('a');
            //add class
            link.className = 'delete-item secondary-content';
            //add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            //Append the link to li
            li.appendChild(link);
            //Append li to ul
            taskList.appendChild(li);

        })

    }

//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    }


    //create li element
    const li = document.createElement('li');
    //add Class
    li.className = 'collection-item';
    //crete text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store in LS
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';

    e.preventDefault();
}

    function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Remove Task
    function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Really'))
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

    //Remove task from Local Storage
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks=[];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
           tasks.forEach(function(task, index) {
               if(taskItem.textContent === task){
                   tasks.splice(index, 1);
               }
           });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function clearTasks(){
    //taskList.innerHTML = '';
    while(taskList.firstChild)
    taskList.removeChild(taskList.firstChild);
    //clear task from local storage
    clearTaskFromLocalStorage()
    }

    function clearTaskFromLocalStorage() {
    localStorage.clear();
    }

    function filterTask(e){
        const text = e.target.value.toLowerCase();
        document.querySelectorAll('.collection-item').forEach
        (function(task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) !== -1)
                task.style.display = 'block';
            else
                task.style.display = 'none';

        });
    }