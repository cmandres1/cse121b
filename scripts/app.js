import { fetchPokeAPI, getPokemonData, getAbilityData } from './fetchPokeAPI.js';

// Function to populate the Pokémon list on the homepage
let pokemonListOffset = 0; // Keeps track of the current offset
let pokemonListData = []; // Declare the variable here

async function populatePokemonList(offset = 0) {
    pokemonListOffset = offset;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`;
    const data = await fetchPokeAPI(apiUrl);

    // Store the fetched data in the pokemonListData variable
    pokemonListData = data.results;

    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = '';

    for (const pokemon of pokemonListData) {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        listItem.addEventListener('click', async () => {
            await displayPokemonDetails(pokemon.name);
        });
        pokemonList.appendChild(listItem);
    }
}

// Function to create Pokémon cards with images
function createPokemonCard(pokemonName, imageUrl) {
  const cardContainer = document.createElement('div');
  cardContainer.className = 'pokemon-card-container';

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = pokemonName;

  const name = document.createElement('p');
  name.textContent = pokemonName;

  cardContainer.appendChild(image);
  cardContainer.appendChild(name);

  return cardContainer;
}
// Event listener for the "Previous 12" button
prevButton.addEventListener('click', async () => {
  await populatePokemonList(pokemonListOffset - 15);
});

// Event listener for the "Next 12" button
nextButton.addEventListener('click', async () => {
  await populatePokemonList(pokemonListOffset + 15);
});

// Function to display detailed information about a Pokémon
async function displayPokemonDetails(pokemonName) {
  const pokemonData = await getPokemonData(pokemonName);

  if (pokemonData) {
      const pokemonDetails = document.getElementById('pokemonDetails');
      const { name, height, weight, types, abilities } = pokemonData;

      // Create a string of Pokémon types
      const typeString = types.map(type => type.type.name).join(', ');

      // Create a list of abilities
      const abilityList = abilities.map(ability => ability.ability.name).join(', ');

      pokemonDetails.innerHTML = `
          <h3>${name}</h3>
          <p>Type(s): ${typeString}</p>
          <p>Height: ${height / 10} m</p>
          <p>Weight: ${weight / 10} kg</p>
          <h2>Abilities</h2>
          <p>${abilityList}</p>
          <h2>Base Stats</h2>
          <ul>
              <li>HP: ${pokemonData.stats[0].base_stat}</li>
              <li>Attack: ${pokemonData.stats[1].base_stat}</li>
              <li>Defense: ${pokemonData.stats[2].base_stat}</li>
              <li>Special Attack: ${pokemonData.stats[3].base_stat}</li>
              <li>Special Defense: ${pokemonData.stats[4].base_stat}</li>
              <li>Speed: ${pokemonData.stats[5].base_stat}</li>
          </ul>
      `;

      // Display Pokémon cards
      const pokemonCards = document.getElementById('pokemonCards');
      pokemonCards.innerHTML = '';
      for (const form of pokemonData.forms) {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.url.split('/').slice(-2, -1)}.png`;
          const card = createPokemonCard(form.name, imageUrl);
          pokemonCards.appendChild(card);
      }
  } else {
      // Handle the case where the Pokémon is not found
      alert('Pokémon not found.');
  }
}

// Function to display a list of abilities for a Pokémon
async function displayPokemonAbilities(abilities) {
  const abilitiesList = document.getElementById('abilitiesList');
  abilitiesList.innerHTML = '';

  for (const ability of abilities) {
      const abilityData = await getAbilityData(ability.ability.name);
      if (abilityData) {
          const listItem = document.createElement('li');
          listItem.textContent = abilityData.name;
          abilitiesList.appendChild(listItem);
      }
  }
}

// Function to search for Pokémon by name or attributes
async function searchPokemon() {
  const searchInput = document.getElementById('searchInput');
  const searchQuery = searchInput.value.trim().toLowerCase();

  if (searchQuery) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchQuery}`;
    const searchData = await fetchPokeAPI(apiUrl);

    if (searchData) {
      // Display detailed information for the found Pokémon
      await displayPokemonDetails(searchData.name);
    } else {
      // Handle the case where the Pokémon is not found
      alert('Pokémon not found.');
    }
  }
}

// Event listener for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchPokemon);

// Event listener for the Enter key in the search input field
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchPokemon();
  }
});
// Initial population of the Pokémon list on the homepage
populatePokemonList(0); // Optionally, you can pass your data here if you've already fetched it.