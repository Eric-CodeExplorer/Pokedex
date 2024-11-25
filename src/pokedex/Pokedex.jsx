import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllSpecies } from "../services/pokeapi";
import { createCards } from "./createCards";
import SearchBar from "../ui/SearchBar";
import { Suspense, useEffect, useReducer } from "react";
import { applyFilters, getName, matchTypes } from "../util/helpers";
import DoubleTypeSelector from "../ui/DoubleTypeSelector";
import Filters from "../ui/Filters";
import Checkbox from "../ui/Checkbox";
import Checkboxes from "../ui/Checkboxes";
import GenerationSelector from "../ui/GenerationSelector";
import LoaderFullPage from "../ui/LoaderFullPage";
import Pages from "../ui/Pages";
import translate from "../util/dictionary";
import useLanguage from "../hooks/useLanguage";

const initial_filter_state = {
  query: "",
  types: { slot1: "null", slot2: "null" },
  noMega: true,
  noGmax: true,
  onlyMega: false,
  generation: "",
};

const rawQueryFunction = (query) => (element, lang) => {
  if (query === "") return true;

  // Check if the query is numeric
  const isNumeric = !isNaN(query);

  if (isNumeric) {
    // Convert query to a number and compare with dexId
    return element.dexId === Number(query);
  }

  // Otherwise, perform name search
  return getName(element.names, lang)
    .toLowerCase()
    .startsWith(query.toLowerCase());
};

const filters = {
  query: (query) => (element) => query === "",
  types: (types) => (element) => {
    return matchTypes(types, element.types);
  },
  noMega: (toggle) => (element) => !toggle || !element.isMega,
  noGmax: (toggle) => (element) => !toggle || !element.isGmax,
  onlyMega: (toggle) => (element) => !toggle || element.isMega,
  generation: (gen) => (element) => gen === "" || element.generation === gen,
};

function reducer(state, action) {
  switch (action.type) {
    case "change_query": {
      return {
        ...state,
        query: action.payload,
      };
    }
    case "change_type1": {
      return { ...state, types: { ...state.types, slot1: action.payload } };
    }
    case "change_type2": {
      return { ...state, types: { ...state.types, slot2: action.payload } };
    }
    case "toggleNoMega": {
      return { ...state, noMega: !state.noMega };
    }
    case "toggleNoGmax": {
      return { ...state, noGmax: !state.noGmax };
    }
    case "toggleOnlyMega": {
      return { ...state, onlyMega: !state.onlyMega };
    }
    case "change_generation": {
      return { ...state, generation: action.payload };
    }
    default:
      throw Error("Unknown action");
  }
}

function Pokedex() {
  const { pokedex: pokemons } = useLoaderData();
  const { lang: currentLanguage } = useLanguage();
  // console.log(`Log: lang = ${currentLanguage}`);

  const [state, dispatch] = useReducer(reducer, initial_filter_state);
  // console.log(`Log from pokedex: pokemons=${pokemons}`);
  useEffect(() => {
    const newFunction = (query) => {
      return (element) => rawQueryFunction(query)(element, currentLanguage);
    };
    filters.query = newFunction;
  }, [currentLanguage]);

  const toggledFilters = Object.keys(state).map((key) =>
    filters[key](state[key])
  );

  return (
    <div>
      <Filters>
        <SearchBar
          value={state.query}
          setter={(value) =>
            dispatch({
              type: "change_query",
              payload: value,
            })
          }
        />
        <DoubleTypeSelector
          type1={state.types.slot1}
          type2={state.types.slot2}
          setter1={(value) =>
            dispatch({ type: "change_type1", payload: value })
          }
          setter2={(value) =>
            dispatch({ type: "change_type2", payload: value })
          }
        />
        <GenerationSelector
          value={state.generation}
          setter={(value) =>
            dispatch({ type: "change_generation", payload: value })
          }
        />
        <Checkboxes>
          <Checkbox
            label={translate("noMega", currentLanguage)}
            checked={state.noMega}
            setChecked={() => dispatch({ type: "toggleNoMega" })}
          />
          <Checkbox
            label={translate("noGmax", currentLanguage)}
            checked={state.noGmax}
            setChecked={() => dispatch({ type: "toggleNoGmax" })}
          />
          <Checkbox
            label={translate("onlyMega", currentLanguage)}
            checked={state.onlyMega}
            setChecked={() => dispatch({ type: "toggleOnlyMega" })}
          />
        </Checkboxes>
      </Filters>
      <Suspense fallback={<LoaderFullPage />}>
        <Await resolve={pokemons} errorElement={<p>Error loading pokedex!</p>}>
          {(pokemons) => (
            <Pages
              items={applyFilters(pokemons, toggledFilters)}
              lang={currentLanguage}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export async function loader() {
  let cachedPokemons = localStorage.getItem("pokedex");

  if (cachedPokemons) {
    // console.log("Log: using cached pokedex");
    return {
      pokedex: JSON.parse(cachedPokemons),
    };
  }

  const fetchPokemons = async () => {
    let species = await getAllSpecies();
    // species = species.slice(0, 100); // To remove when done
    const pokemons = await Promise.all(species.map(createCards));
    const flatten_pokemons = pokemons.flat();
    localStorage.setItem("pokedex", JSON.stringify(flatten_pokemons));
    return flatten_pokemons;
  };

  return defer({
    pokedex: fetchPokemons(),
  });
}
export default Pokedex;
