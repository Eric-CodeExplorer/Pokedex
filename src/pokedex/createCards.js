import { getSpecies, getVariety } from "../services/pokeapi";

function createCard(dexId, species, variety) {
  const pokemon = {};
  pokemon.dexId = dexId;
  // pokemon.name = getName(species.names, "en");
  pokemon.names = species.names;
  pokemon.generation = species.generation.name;
  pokemon.types = variety.types.map((type) => type.type.name);
  pokemon.image = variety.sprites.front_default;
  pokemon.isMega = /.*-mega.*/.test(variety.name);
  pokemon.isGmax = variety.name.endsWith("-gmax");
  // console.log(pokemon.image);
  return pokemon;
}

export async function createCards(data) {
  const pokemons = [];
  const dexId = data.entry_number;
  const species_url = data.pokemon_species.url;
  const species = await getSpecies(species_url);
  const variety_urls = species.varieties.map((v) => v.pokemon.url);
  const varieties = await Promise.all(variety_urls.map(getVariety));
  for (let i = 0; i < varieties.length; i++) {
    pokemons.push(createCard(dexId, species, varieties[i]));
  }
  return pokemons;
}

/*
card contains brief info of a pokemon:
    name(lang) : name in language 'lang'
    names: names in different languages
    dexId: national pokedex id
    generation: introduced generation
    types: types
    image: default front image
*/
