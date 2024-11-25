import styled from "styled-components";
import SectionContainer from "./SectionContainer";
import LoaderFullPage from "../ui/LoaderFullPage";
import { useContext, useEffect, useState } from "react";
import { getMove } from "../services/pokeapi";
import GenerationSelector from "../ui/GenerationSelector";
import LearnMethodSelector from "./LearnMethodSelector";
import MoveSummary from "./MoveSummary";
import { filterMoves, isEmptyObj } from "../util/helpers";
import AppContext from "../context/AppContext";
import translate from "../util/dictionary";

const SelectorContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;

  @media only screen and (min-width: 1025px) {
    width: 75%;
  }
`;

const StyledTitle = styled.div`
  font-size: 1.5em;
  font-weight: normal;
  padding: 10px;
`;

const StyledTable = styled.div`
  border: 1px solid;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

function Table({ moves, selectedMethod, lang }) {
  let move_list =
    selectedMethod === "level-up"
      ? moves.toSorted((m1, m2) => m1.level_learned_at - m2.level_learned_at)
      : moves;
  // console.log(move_list);
  return (
    <StyledTable>
      {move_list.map((m, i) => (
        <MoveSummary key={i} move={m} lang={lang} />
      ))}
    </StyledTable>
  );
}

function PokemonMoves({ data, lang }) {
  const { gens, versionGroups } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGen, setSelectedGen] = useState("generation-ix");
  const [selectedMethod, setSelectedMethod] = useState("level-up");
  const [moves, setMoves] = useState([]);
  useEffect(() => {
    const prepare_data = async () => {
      setIsLoading(true);
      const all_data = await Promise.all(
        data.map(async (move) => {
          const move_data = await fetchMoveData(move);
          return move_data;
        })
      );
      setMoves(all_data);
      setIsLoading(false);
    };
    prepare_data();
  }, [setIsLoading, data]);

  if (moves.length === 0) return <LoaderFullPage />;

  const handleSelectGen = (gen) => {
    if (gen === "" || gen === "all") {
      return;
    }
    setSelectedGen(gen);
  };
  const filtered_moves = moves
    .map((m) =>
      filterMoves(m, selectedMethod, selectedGen, versionGroups, gens)
    )
    .filter((m) => !isEmptyObj(m));

  // console.log(filtered_moves);
  return (
    <SectionContainer id="moves">
      {isLoading ? (
        <LoaderFullPage />
      ) : (
        <Container>
          <StyledTitle>{translate("moves", lang)}</StyledTitle>
          <SelectorContainer>
            <LearnMethodSelector
              value={selectedMethod}
              setter={setSelectedMethod}
              lang={lang}
            />
            <GenerationSelector value={selectedGen} setter={handleSelectGen} />
          </SelectorContainer>
          <Table
            moves={filtered_moves}
            selectedMethod={selectedMethod}
            lang={lang}
          />
        </Container>
      )}
    </SectionContainer>
  );
}

export default PokemonMoves;

async function fetchMoveData(data) {
  const result = {};
  const move_url = data.move.url;
  result.name = data.move.name;
  result.version_group_details = data.version_group_details;

  const move_data = await getMove(move_url);

  result.accuracy = move_data.accuracy;
  result.damage_class = move_data.damage_class.name;
  result.names = move_data.names;
  result.power = move_data.power;
  result.type = move_data.type;
  return result;
}
