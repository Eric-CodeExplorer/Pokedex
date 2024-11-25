import {
  getAbility,
  getEvolutionChain,
  getForm,
  getSpeciesByDexId,
  getVariety,
  getVersionGroup,
} from "../services/pokeapi";

const speciesKeysToKeep = [
  "capture_rate",
  "gender_rate",
  "genera",
  "growth_rate",
  "hatch_counter",
  "name",
  "names",
];

export default async function getPokemonData(dexId) {
  const result = { dexId };
  const species_data = await getSpeciesByDexId(dexId);

  // TODO: Translations for growth-rate:  https://pokeapi.co/api/v2/growth-rate/
  speciesKeysToKeep.forEach((key) => {
    result[key] = species_data[key];
  });
  result.egg_groups = species_data.egg_groups.map((g) => g.name);
  result.evolv_chain_data = await getEvolutionChain(
    species_data.evolution_chain.url
  );

  const varieties_links = species_data.varieties;
  result.varieties = await Promise.all(varieties_links.map(getVarietyData));

  return result;
}

const varietiesKeysToKeep = [
  "base_experience",
  "height",
  "moves",
  "stats",
  "types",
  "weight",
];

async function getVarietyData(link) {
  const result = {
    is_default: link.is_default,
    name: link.pokemon.name,
  };
  const varieties_url = link.pokemon.url;
  const varieties_data = await getVariety(varieties_url);

  const forms = await Promise.all(
    varieties_data.forms.map(async (form_link) => {
      const form_result = {};
      const form_data = await getForm(form_link.url);
      form_result.form_name = form_data.form_name;
      form_result.form_names = form_data.form_names;
      form_result.front_default = form_data.sprites.front_default;
      form_result.front_shiny = form_data.sprites.front_shiny;
      const version_group = await getVersionGroup(form_data.version_group.url);
      form_result.generation = version_group.generation.name;
      // form_result.version_group = form_data.version_group;
      return form_result;
    })
  );
  result.forms = forms;

  const abilities = await Promise.all(
    varieties_data.abilities.map(async (ability_link) => {
      const ability_result = {};
      const ability_data = await getAbility(ability_link.ability.url);
      ability_result.names = ability_data.names;
      ability_result.flavor_text_entries = ability_data.flavor_text_entries;
      ability_result.is_hidden = ability_link.is_hidden;
      ability_result.slot = ability_link.slot;
      return ability_result;
    })
  );

  result.abilities = abilities;

  varietiesKeysToKeep.forEach((key) => {
    result[key] = varieties_data[key];
  });

  return result;
}
