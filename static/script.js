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
});
