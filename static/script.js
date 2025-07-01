// BUTTON
const addButton = document.querySelector('.add-task');
addButton.addEventListener('click', () => {
    openModal();
});

const homeButton = document.querySelector('#home');
const todayButton = document.querySelector('#today');
const addgroupButton = document.querySelector('#add-group');

homeButton.addEventListener('click', () => {
    tasksList.view = "home";
    tasksList.displayTasks();
    document.querySelector('.tasks-container h1').textContent = "Home";
});

todayButton.addEventListener('click', () => {
    tasksList.view = "today";
    tasksList.displayTasks();
    document.querySelector('.tasks-container h1').textContent = "Today";
});

addgroupButton.addEventListener('click', () => {
    document.querySelector('.group-modal').style.display = 'flex';
});

// MODAL
function openModal() {
    document.querySelector('.modal').style.display = 'flex';
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === document.querySelector('.modal')) {
        closeModal();
    }

    if (event.target === document.querySelector('.group-modal')) {
        document.querySelector('.group-modal').style.display = 'none';
    }
};

// FORM
document.querySelector('form').addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value;
    const priority = document.querySelector("input[name='priority']:checked")?.value;
    const date = document.querySelector('#date').value;
    const group = document.querySelector('#group').value;

    tasksList.addTask(title, desc, priority, date, group);

    document.querySelector('form').reset();
    closeModal();
});

document.querySelector('.add-group-btn').addEventListener('click', () => {
    const name = document.querySelector('#group-name').value.trim();
    if (!name) return;

    const list = document.querySelector('#groups-ul');
    const group = document.createElement('li');
    group.textContent = name;

    group.addEventListener('click', () => {
        tasksList.view = name;
        tasksList.displayTasks();
        document.querySelector('.tasks-container h1').textContent = name;
    });

    list.prepend(group);

    const groupInput = document.querySelector('#group');
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    groupInput.appendChild(option);

    document.querySelector('#group-name').value = '';
    document.querySelector('.group-modal').style.display = 'none';
});



const tasksList = new TaskList();