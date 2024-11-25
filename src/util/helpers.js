import translate from "./dictionary";

export function getName(names, lang) {
  // console.log(names);
  if (lang === undefined || lang === null || names === undefined) {
    throw Error("getName(): Must pass the language to the function");
  }
  // return names.find((name) => name.language.name === lang)?.name;

  let target = names.find((name) => name.language.name === lang);
  if (target === undefined) {
    if (lang !== "en") {
      target = names.find((name) => name.language.name === lang);
      if (target === undefined) {
        return translate(names[0].name, lang);
      }
    } else {
      console.log(names);
      throw Error(`getName(): Can't find name in ${lang} and in en`);
    }
  }
  return target.name;
}

export function applyFilters(elements, filters) {
  return elements.filter((element) => {
    return filters.every((filter) => filter(element));
  });
}

export function matchTypes(filterType, pokemonType) {
  const filterType1 = filterType.slot1 !== "null" ? filterType.slot1 : null;
  const filterType2 = filterType.slot2 !== "null" ? filterType.slot2 : null;

  const matchesType1 = filterType1 ? pokemonType.includes(filterType1) : true;
  const matchesType2 = filterType2 ? pokemonType.includes(filterType2) : true;

  return matchesType1 && matchesType2;
}

export function getDefaultVariety(varieties) {
  return varieties.find((v) => v.is_default);
}

export function getDefaultVarietyIndex(varieties) {
  return varieties.findIndex((v) => v.is_default);
}

export function cleanText(flavorText) {
  return flavorText
    .replace(/\f/g, "\n") // Replace form feed with newline
    .replace(/\u00ad\n/g, "") // Remove soft hyphen followed by newline
    .replace(/\u00ad/g, "") // Remove remaining soft hyphen
    .replace(/ -\n/g, " - ") // Replace " -<newline>" with " - "
    .replace(/-\n/g, "-") // Replace "-<newline>" with "-"
    .replace(/\\n/g, " ")
    .replace(/\n/g, " "); // Replace remaining newline with space
}

export function getEVGain(stats) {
  const result = {};
  stats.forEach((stat) => {
    if (stat.effort > 0) {
      result[stat.stat.name] = stat.effort;
    }
  });
  return result;
}

export function getGenera(genera, lang) {
  const result = genera.find((g) => g.language.name === lang);
  if (result === undefined) {
    return "";
  }
  return result.genus;
}

export function filterMoves(move, method, generation, version_list, gen_list) {
  let gen = generation === "" ? "null" : generation;
  // console.log(move);
  const info = {};
  let newest = 0;
  const versions = move.version_group_details;
  const target_gen_id = gen_list[gen].id;
  const n = versions.length;
  // console.log(versions);
  for (let i = 0; i < n; i++) {
    // console.log(n);
    const version = versions[i];
    const version_name = version.version_group.name;
    const version_gen = version_list[version_name].generation;
    const version_gen_id = gen_list[version_gen].id;
    // console.log(1);
    if (version_gen_id <= target_gen_id) {
      if (
        version_gen_id > newest &&
        validMoveLearnMethod(method, version.move_learn_method.name)
      ) {
        info.level_learned_at = version.level_learned_at;
        info.move_learn_method = version.move_learn_method.name;
        info.name = move.name;
        info.accuracy = move.accuracy;
        info.damage_class = move.damage_class;
        info.names = move.names;
        info.power = move.power;
        info.type = move.type;
      }
    }
  }
  // console.log(info);
  return info;
}

export function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

function validMoveLearnMethod(targetMethod, method) {
  if (targetMethod === "other") {
    return (
      method !== "level-up" &&
      method !== "machine" &&
      method !== "egg" &&
      method !== "tutor"
    );
  } else return targetMethod === method;
}

export function isPromise(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.then === "function"
  );
}
