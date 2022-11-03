// Busca os botões da DOM na página web
var btn = document.querySelectorAll('button.modal-button');

// Busca todos os modais na página
var modals = document.querySelectorAll('.modal');

// Busca o elemento <span> que fecha o nosso modal
var spans = document.getElementsByClassName('close');

// Quando o usuário clica no botão, abre o modal
for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function (e) {
        e.preventDefault();
        modal = document.querySelector(e.target.getAttribute('href'));
        modal.style.display = 'block';
    };
}

// Quando o usuário clica no <spam> (x), fecha o modal
for (var i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined')
                modals[index].style.display = 'none';
        }
    };
}

// Quando o usuário clioca em qualquer lugar fora do modal,
// feche-o
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined')
                modals[index].style.display = 'none';
        }
    }
};
