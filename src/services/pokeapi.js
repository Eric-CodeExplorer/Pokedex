const BASE_URL = "https://pokeapi.co/api/v2";

export async function getAllSpecies() {
  try {
    const res = await fetch(`${BASE_URL}/pokedex/1/`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data["pokemon_entries"];
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch data");
  }
}

export async function getSpecies(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch species");
  }
}

export async function getSpeciesByDexId(dexId) {
  try {
    const res = await fetch(`${BASE_URL}/pokemon-species/${dexId}`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch species");
  }
}

export async function getVariety(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch species");
  }
}

export async function getTypeById(id) {
  try {
    const res = await fetch(`${BASE_URL}/type/${id}`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to fetch type ${id}`);
  }
}

export async function getGenerationById(id) {
  try {
    const res = await fetch(`${BASE_URL}/generation/${id}`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to fetch generation ${id}`);
  }
}

export async function getEvolutionChain(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch evolution chain");
  }
}

export async function getForm(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch form");
  }
}

export async function getEggGroupById(id) {
  try {
    const res = await fetch(`${BASE_URL}/egg-group/${id}`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to fetch Egg Group ${id}`);
  }
}

export async function getAbility(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch Ability");
  }
}

export async function getVersionGroup(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch Version Group");
  }
}

export async function getStatById(id) {
  try {
    const res = await fetch(`${BASE_URL}/stat/${id}`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to fetch Stat ${id}`);
  }
}

export async function getVersionGroupByID(id) {
  try {
    const res = await fetch(`${BASE_URL}/version-group/${id}`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to fetch Version Group ${id}`);
  }
}

export async function getMove(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to fetch Move");
  }
}
