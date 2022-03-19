// Seleccionar cada uno de los elementos que vamos a utilizar
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//Diccionario mapeando tipo de pokemon a un color
const typeColors = {
    electric: '#F3FA30',
    normal: '#3335C9',
    fire: '#F60303',
    water: '#03C1F6',
    ice: '#ADE2F5',
    rock: '#805610',
    flying: '#EEB522',
    grass: '#2AED40',
    psychic: '#722AED',
    ghost: '#B7B8F1',
    bug: '#FC8CEF',
    poison: '#F19E22',
    ground: '#7B500E',
    dragon: '#FC3B06',
    steel: '#959595',
    fighting: '#F06607',
    default: '#0E5AE6',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
        
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);

}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '10px 10px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement('div');
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        //al statElement se le agregan los dos elementos
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        //agregamos el elemento entero a pokeStats
        pokeStats.appendChild(statElement);

    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('scr', './resources/pikachunotfound.png');
    pokeImg.style.background = '#ffff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
