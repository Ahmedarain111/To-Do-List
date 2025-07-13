document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-task');
    const addgroupButton = document.querySelector('#add-group');

    addButton.addEventListener('click', () => {
        openModal('.modal');
    });

    addgroupButton.addEventListener('click', () => {
        openModal('.group-modal');
    });

    // MODAL Functions
    function openModal(modal) {
        document.querySelector(modal).style.display = 'flex';
    }

    function closeModal(modal) {
        document.querySelector(modal).style.display = 'none';
    }

    // Close modals when clicking outside of them
    window.onclick = function (event) {
        if (event.target === document.querySelector('.modal')) {
            closeModal('.modal');
        } else if (event.target === document.querySelector('.group-modal')) {
            closeModal('.group-modal');
        }
    };

    // Task
    document.querySelectorAll('.task').forEach(task => {
        const dropdown = task.querySelector('.task-dropdown');

        task.addEventListener('mouseover', () => {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';

            const dropdownHeight = dropdown.offsetHeight + 10;
            let nextTask = task.nextElementSibling;
            while (nextTask) {
                nextTask.style.transition = 'transform 0.3s ease';
                nextTask.style.transform = `translateY(${dropdownHeight}px)`;
                nextTask = nextTask.nextElementSibling;
            }
        });

        task.addEventListener('mouseout', () => {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';

            let nextTask = task.nextElementSibling;
            while (nextTask) {
                nextTask.style.transition = 'transform 0.3s ease';
                nextTask.style.transform = 'translateY(0)';
                nextTask = nextTask.nextElementSibling;
            }
        });
    });

    document.querySelector('#home').addEventListener('click', () => {
        window.location.href = '/';
    });

    document.querySelectorAll('#groups-ul li').forEach(groupItem => {
    groupItem.addEventListener('click', () => {
        const groupName = groupItem.textContent.trim();
        window.location.href = `/?group=${encodeURIComponent(groupName)}`;
    });
});

});


