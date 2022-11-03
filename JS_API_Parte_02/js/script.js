// Função para fazer o request na API
function getImage(e) {
    // Busca a url da API no HTML
    let url_api = document.getElementById('url_api').innerText;
    console.log(url_api);

    // Função fetch para buscar dados na API
    fetch(url_api, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
document.getElementById('id').innerText = data[0].id;

            let imagem = `
                   <img class="rounded img-fluid" src="${data[0].url}" />
                `;

            // Insere a imagem no elemento HTML com id imagem_aqui
            document.querySelector('#imagem_aqui').innerHTML = imagem;
        });
}
