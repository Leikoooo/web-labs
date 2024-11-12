
document.querySelectorAll('.cow-description').forEach(function (item) {
    item.addEventListener('click', function () {
        var description = item.getAttribute('data-description');
        document.getElementById('cow-description').textContent = description;
        var myModal = new bootstrap.Modal(document.getElementById('cowModal'));
        myModal.show();
    });
});

