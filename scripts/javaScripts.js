window.addEventListener('DOMContentLoaded', function () {
    let myBtns = document.querySelectorAll('.main__menu-button');
    myBtns.forEach(function (btn) {
        btn.addEventListener('click', () => {
            myBtns.forEach(b => b.classList.remove('main__menu-button-active'));
            btn.classList.add('main__menu-button-active');
            if (btn.id === 'menu-zaza-btn') {
                toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    positionClass: 'toast-top-right',
                    timeOut: 3000,
                    extendedTimeOut: 1000,
                    showMethod: 'fadeIn',
                    hideMethod: 'fadeOut'
                };
                toastr.success('Вот ты и попался:) За тобой выехали', 'Уведомление');
            }
        });
    });
});

function toggleContainer(containerId) {
    document.querySelectorAll('.container').forEach(function (content) {
        content.style.display = 'none';
    });

    document.getElementById(containerId).style.display = 'block';
}
