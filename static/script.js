document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-task');
    const addgroupButton = document.querySelector('#add-group');

    addButton.addEventListener('click', () => {
        openModal();
    });

    addgroupButton.addEventListener('click', () => {
        document.querySelector('.group-modal').style.display = 'flex';
    });

    // MODAL Functions
    function openModal() {
        document.querySelector('.modal').style.display = 'flex';
    }

    function closeModal() {
        document.querySelector('.modal').style.display = 'none';
    }

    // Close modals when clicking outside of them
    window.onclick = function (event) {
        const taskModal = document.querySelector('.modal');
        const groupModal = document.querySelector('.group-modal');

        if (event.target === taskModal) {
            closeModal();
        }

        if (event.target === groupModal) {
            groupModal.style.display = 'none';
        }
    };
});
