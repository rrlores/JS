// Busca o elemento com a ID search
const search = document.getElementById('search');
// Busca o elemento com a ID match-list
const matchList = document.getElementById('match-list');

/* Função para procurar os estados no arquivo estados.json 
 e filtra-los para exibir apenas os que correpondem a busca */
const buscarEstados = async (searchText) => {
    const res = await fetch('./dados/estados.json');
    const states = await res.json();
    console.log(states);

    // Pega os valores correspondentes com o texto digitado
    let matches = states.filter((state) => {
        const regex = new RegExp(`^${searchText}`, 'gi'); // Regular expression
        // Retorna o(s) estado(s) que corresponde ao texto digitado
        return state.nome.match(regex) || state.abrev.match(regex);
    });

    // Limpa a lista de exibição dos estados se o <input> estiver vazio
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    // console.log(matches);
    saidaHTML(matches); // Invoca a função saidaHTML
};

// Exibe os resultados no HTML
const saidaHTML = (matches) => {
    if (matches.length > 0) {
        // Constrói o HTML com os valores correspondentes a busca
        const html = matches
            .map(
                (match) => `
            <div class="card card-body mb-1">
                <h4>${match.nome} (${match.abrev})<br /> <span class="text-primary">${match.capital}</span></h4>
                <small>Área: ${match.area} km<sup>2</sup> <br /> População: ${match.pop} habitantes</small>
            </div>
        `
            )
            .join('');

        // console.log(html);
        matchList.innerHTML = html; // Insere o conteúdo na página web
    }
};

// Adiciona o evento no elemento <input> da página web
search.addEventListener('input', () => buscarEstados(search.value));
