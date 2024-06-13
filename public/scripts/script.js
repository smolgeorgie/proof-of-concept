var deleteButtons = document.querySelectorAll('.icon.delete');

deleteButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.target.closest('li').remove();
    });
});

