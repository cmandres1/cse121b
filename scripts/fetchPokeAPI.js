// Function to make API requests and handle errors
export async function fetchPokeAPI(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      return null;
    }
}
// Function to fetch Pokémon data by name or ID
export async function getPokemonData(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemonData = await fetchPokeAPI(apiUrl);
    return pokemonData;
  }
  
  // Function to fetch ability data by ability name or ID
  export async function getAbilityData(abilityName) {
    const apiUrl = `https://pokeapi.co/api/v2/ability/${abilityName}`;
    const abilityData = await fetchPokeAPI(apiUrl);
    return abilityData;
  }


