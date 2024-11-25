import { createContext, useState, useEffect } from "react";
import {
  getEggGroupById,
  getGenerationById,
  getStatById,
  getTypeById,
  getVersionGroupByID,
} from "../services/pokeapi";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [types, setTypes] = useState(null);
  const [gens, setGens] = useState(null);
  const [eggGroups, setEggGroups] = useState(null);
  const [stats, setStats] = useState(null);
  const [versionGroups, setVersionGroups] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  useEffect(() => {
    const fetchTypes = async () => {
      const cached = localStorage.getItem("types");
      if (cached) {
        // console.log(`Log from context: using cached types`);
        setTypes(JSON.parse(cached));
        return;
      }
      const types = {
        null: { id: 0, names: [] },
      };
      for (let i = 1; i <= 18; i++) {
        const data = await getTypeById(i);
        types[data.name] = {
          id: data.id,
          names: data.names,
          img: `/src/assets/type_icons/${data.name}.png`,
        };
      }
      setTypes(types);
      localStorage.setItem("types", JSON.stringify(types));
    };
    fetchTypes();
  }, [setTypes]);

  useEffect(() => {
    const fetchGens = async () => {
      const cached = localStorage.getItem("gens");
      if (cached) {
        setGens(JSON.parse(cached));
        return;
      }
      const gens = {
        null: { id: 0, name: "", names: [] },
      };
      for (let i = 1; i <= 9; i++) {
        // const data = await getGenById(i);
        const data = await getGenerationById(i);
        gens[data.name] = {
          id: data.id,
          name: data.name,
          names: data.names,
        };
      }
      setGens(gens);
      localStorage.setItem("gens", JSON.stringify(gens));
    };
    fetchGens();
  }, [setGens]);

  useEffect(() => {
    const fetchEggGroups = async () => {
      const cached = localStorage.getItem("egg_groups");
      if (cached) {
        setEggGroups(JSON.parse(cached));
        return;
      }
      const egg_groups = {
        null: { id: 0, name: "", names: [] },
      };
      for (let i = 1; i <= 15; i++) {
        const data = await getEggGroupById(i);
        egg_groups[data.name] = {
          id: data.id,
          name: data.name,
          names: data.names,
        };
      }
      setEggGroups(egg_groups);
      localStorage.setItem("egg_groups", JSON.stringify(egg_groups));
    };
    fetchEggGroups();
  }, [setEggGroups]);

  useEffect(() => {
    const fetchStats = async () => {
      const cached = localStorage.getItem("stats");
      if (cached) {
        setStats(JSON.parse(cached));
        return;
      }
      const stats = {
        null: { id: 0, name: "", names: [] },
      };
      for (let i = 1; i <= 8; i++) {
        const data = await getStatById(i);
        stats[data.name] = {
          id: data.id,
          name: data.name,
          names: data.names,
        };
      }
      setStats(stats);
      localStorage.setItem("stats", JSON.stringify(stats));
    };
    fetchStats();
  }, [setStats]);

  useEffect(() => {
    const fetchVersions = async () => {
      const cached = localStorage.getItem("version_groups");
      if (cached) {
        setVersionGroups(JSON.parse(cached));
        return;
      }
      const groups = {
        null: { id: 0, name: "", generation: "" },
      };
      for (let i = 1; i <= 27; i++) {
        const data = await getVersionGroupByID(i);
        groups[data.name] = {
          id: data.id,
          name: data.name,
          generation: data.generation.name,
        };
      }
      setVersionGroups(groups);
      localStorage.setItem("version_groups", JSON.stringify(groups));
    };
    fetchVersions();
  }, [setVersionGroups]);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        types,
        setTypes,
        gens,
        setGens,
        eggGroups,
        stats,
        versionGroups,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
