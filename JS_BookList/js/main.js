// Classe Book: Representa um livro
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Classe UI (User Interface): lida com as tarefas da UI
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `  
	            <td>${book.title}</td>  
	            <td>${book.author}</td>  
	            <td>${book.isbn}</td>  
	            <td><a href="#" class="btn btn-danger btn-sm delete">X</td>  
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className, fontSize, alignText) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} ${fontSize} text-${alignText}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Apaga o alerta após 3 segundos
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Classe Store: lida com o Storage local do navegador web
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Evento: Mostrar os Livros
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Evento: Adicionar um Livro
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Evita a ação de submeter formulário
    e.preventDefault();

    // Busca valores do formulário
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validação, verifica se os campos então preenchidos
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert(
            'Favor preencha todos os campos!',
            'danger',
            'fs-4 fw-bold',
            'center'
        );
    } else {
        // Instância da classe Book
        const book = new Book(title, author, isbn);

        // Adiciona o Livro na lista
        UI.addBookToList(book);

        // Adiciona o livro no localstorage do navegador web
        Store.addBook(book);

        // Mostra mensagem de sucesso
        UI.showAlert('Livro adiconado', 'success', 'fs-4 fw-bold', 'center');

        // Limpa os campos do formulário
        UI.clearFields();
    }
});

// Event: Remover um Livro
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove o livro da UI
    UI.deleteBook(e.target);

    // Remove o livro do localstore do navegador web
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Mostra mensagem de sucesso
    UI.showAlert('Livro removido', 'success', 'fs-4 fw-bold', 'center');
});
