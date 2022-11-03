// Busca os elementos com a ID my-modal no DOM
const modal = document.querySelector('#my-modal');
// Busca os elementos com a ID modal-btn no DOM
const modalBtn = document.querySelector('#modal-btn');
// Busca os elementos com a classe .close no DOM
const closeBtn = document.querySelector('.close');

// Adiciona eventos de clique para invocar as funções para abrir e fechar o modal
modalBtn.addEventListener('click', () => (modal.style.display = 'block'));
closeBtn.addEventListener('click', () => (modal.style.display = 'none'));

// Fecha o modal ser clicarmos fora do modal
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});
