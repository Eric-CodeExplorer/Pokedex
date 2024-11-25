import styled from "styled-components";
import { getName } from "../util/helpers";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const StyledType = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 0.5em;
  img {
    width: 2em;
    height: 2em;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  user-select: none;
`;

function TypeUI({ types, lang }) {
  const { types: context_types } = useContext(AppContext);
  return (
    <Container>
      {types.map((type, i) => (
        <StyledType key={i}>
          <img src={`/src/assets/type_icons/${type}.png`} />
          <span>{getName(context_types[type].names, lang)}</span>
        </StyledType>
      ))}
    </Container>
  );
}

export default TypeUI;
