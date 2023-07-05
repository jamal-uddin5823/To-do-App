let taskList = [];
window.card = null;
const list = document.querySelector('.task-list');

//popup
function createPopupWin(pageURL, pageTitle) {
    let left = (window.width ) ;
    let top = (window.height ) ;
    let myWindow = window.open(pageURL, pageTitle,
        'width=' + 400
        + ', height=' + 600 + ', top='
        + top + ', left=' + left);
    return window;
}

//add task
window.addTask = (newTask) => {
    taskList.push(newTask);
    list.innerHTML= taskList.map(({text,date,description},index)=> {
        return `<div id="${index}" class="task">
        <section class="title-date">
        <p class="task-title">${text}</p>
        <p class="task-date">${date}</p>
        </section>
        <p class="task-desc">${description}</p>
        <i onclick="editTask(this)" class="fas fa-edit"></i>
        <i onclick="deleteTask(this)" class="fas fa-trash-alt"></i>
        </div>`
    });
}


//edit Task
window.postEditedTask = (value) =>{
    const card = document.getElementById(value.id);
    card.querySelector('.task-title').innerHTML = value.title;
    card.querySelector('.task-date').innerHTML = value.date;
    card.querySelector('.task-desc').innerHTML = value.description;
}
function editTask(editIcon) {
    const id = editIcon.parentElement.id;
    const description = editIcon.previousElementSibling;
    const title = description.previousElementSibling.querySelector('.task-title');
    const date = description.previousElementSibling.querySelector('.task-date');
    
    window.card = {id,
        text:title.innerHTML,
        date: date.innerHTML,
        description: description.innerHTML
    };
    createPopupWin('../html/form.html','Edit Task');
    
    
}

//delete
function deleteTask(deleteIcon) {
    const card = deleteIcon.parentElement;
    const value = {
        title: card.querySelector('.task-title').innerHTML,
        date: card.querySelector('.task-date').innerHTML,
        description: card.querySelector('.task-desc').innerHTML
    };

    //remove task from list
    (function (object) {
        taskList = taskList.filter((item) => {
          // Check if the values of the current object match the provided object
          for (const key in object) {
            if (object.hasOwnProperty(key) && item.hasOwnProperty(key)) {
              if (object[key] !== item[key]) {
                return true; // Keep the object if values don't match
              }
            }
          }
          return false; // Remove the object if all values match
        });
    })(value); 

    deleteIcon.parentElement.remove();
}


const addButton = document.getElementById('new-task');
addButton.addEventListener('click',()=>{
    createPopupWin('../html/form.html','Add New Task');
})


