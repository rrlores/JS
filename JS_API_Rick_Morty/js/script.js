let select_opt = document.getElementById('opt');
let label = document.getElementById('label');
let button = document.getElementById('button');
let info = document.getElementById('info');
let outros = document.getElementById('outros');
let title_card = document.getElementById('title_card');
const api = 'https://rickandmortyapi.com/api/';

document.getElementById('info').addEventListener('change', function (e) {
    let valor = info.value;
    let url_api = api;
    let str_opt = '';

    url_api += `${valor}`;

    if (valor != '') {
        fetch(url_api, {
            method: 'GET',
        })
            .then((res) => {
                return res.json();
            })
            .then((dados) => {
                dados.results.forEach((elemento) => {
                    str_opt += `  
                    <option value=${elemento.id}>${elemento.name}</option>  
                `;
                });
                // Insere as informações no elemento HTML com id dados
                select_opt.innerHTML = str_opt;
                label.innerHTML = `<em>Dados de ${valor}: </em>`;

                label.style.display = 'inline';
                select_opt.style.display = 'inline';
                button.disabled = false;
            });
    }
});

const getData = () => {
    cleanData();
    let valor = info.value;
    let url_api = api;

    url_api += `${valor}/${select_opt.value}`;

    fetch(url_api, {
        method: 'GET',
    })
        .then((res) => {
            return res.json();
        })
        .then((dados) => {
            console.log(dados);
            document.getElementById('id').innerText = dados.id;
            document.getElementById('name').innerText = dados.name;
            chooseData(dados);
        });
};

const chooseData = (dados) => {
    if (info.value == 'character') {
        outros.innerHTML = `<p><b>Espécie</b>: ${dados.species} </p>  
            <p><b>Gênero</b>: ${dados.gender} </p>  
            <p><b>Origem</b>: ${dados.origin.name} </p>  
        `;

        title_card.innerHTML = '<b>Imagem</b>';

        let imagem = `  
                    <img class="rounded img-fluid" src="${dados.image}" />  
                `;

        // Insere a imagem no elemento HTML com id imagem_aqui
        document.querySelector('#imagem_aqui').innerHTML = imagem;
    }

    if (info.value == 'location') {
        outros.innerHTML = `<p><b>Tipo</b>: ${dados.type} </p>  
            <p><b>Dimensão</b>: ${dados.dimension} </p>  
        `;
    }

    if (info.value == 'episode') {
        outros.innerHTML = `<p><b>Data de lançamento</b>: ${dados.air_date} </p>  
            <p><b>Temporada e episódio</b>: ${dados.episode} </p>  
        `;
    }
};

const cleanData = () => {
    outros.innerHTML = '';
    title_card.innerHTML = '';
    document.querySelector('#imagem_aqui').innerHTML = '';
};
