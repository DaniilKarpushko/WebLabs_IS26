window.addEventListener('DOMContentLoaded', function() {
    let myBtns = document.querySelectorAll('.main__menu-button');
    myBtns.forEach(function (btn) {

        btn.addEventListener('click', () => {
            myBtns.forEach(b => b.classList.remove('main__menu-button-active'));
            btn.classList.add('main__menu-button-active');
        });

    });
});

function toggleContainer(containerId) {
    document.querySelectorAll('.container').forEach(function(content) {
        content.style.display = 'none';
    });

    document.getElementById(containerId).style.display = 'block';
}