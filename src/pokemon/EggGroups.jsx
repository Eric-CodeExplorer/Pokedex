import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { getName } from "../util/helpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Group({ group, lang }) {
  const { eggGroups } = useContext(AppContext);
  const name = getName(eggGroups[group].names, lang);
  return <div>{name}</div>;
}

function EggGroups({ egg_groups, lang }) {
  return (
    <Container>
      {egg_groups.map((g, i) => (
        <Group group={g} lang={lang} key={i} />
      ))}
    </Container>
  );
}

export default EggGroups;
