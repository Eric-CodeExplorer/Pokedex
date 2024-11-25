import styled from "styled-components";
import DamageIcon from "../ui/DamageIcon";
import { getName } from "../util/helpers";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  @media only screen and (min-width: 1025px) {
    padding: 0 30px;
  }
`;

const StyledLeft = styled.div`
  max-width: 40%;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;

  /* border: 1px solid; */
`;

const StyledRight = styled.div`
  max-width: 60%;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
  /* border: 1px solid; */
`;

const StyledMoveStat = styled.div`
  /* border: 1px solid; */
  border-radius: 45%;
  /* background-color: #ccc; */
  /* padding: 0.5em 0.6em; */
  display: flex;
  justify-content: center;
  gap: 0.3em;
  font-size: 0.9em;
`;

const IconContainer = styled.div`
  /* border: 1px solid; */
  border-radius: 45%;
  /* background-color: #ccc; */
  padding: 0.5em 0.5em;
  display: flex;
  justify-content: center;
  gap: 0.33em;

  img {
    width: 2.2em;
    height: 2.2em;
  }
`;

const StyledLevel = styled.div`
  font-size: 0.95em;
  color: darkgreen;
  font-weight: 550;
`;

const StyledMoveName = styled.div`
  font-weight: 600;
`;

function MoveStat({ acc, pow }) {
  const accuracy = acc === null ? "-" : acc;
  const power = pow === null ? "-" : pow;
  return (
    <StyledMoveStat>
      <div>{accuracy}</div>
      <div>|</div>
      <div>{power}</div>
    </StyledMoveStat>
  );
}

function Right({ accuracy, power, damag_class, type }) {
  const img = `/src/assets/type_icons/${type}.png`;
  return (
    <StyledRight>
      <MoveStat acc={accuracy} pow={power} />
      <IconContainer>
        <DamageIcon dmg_class={damag_class} />
        <img src={img} className="type" />
      </IconContainer>
    </StyledRight>
  );
}

function Left({ level, name }) {
  return (
    <StyledLeft>
      {level != -1 && <StyledLevel>{level}</StyledLevel>}
      <StyledMoveName>{name}</StyledMoveName>
    </StyledLeft>
  );
}

function MoveSummary({ move, lang }) {
  const name = getName(move.names, lang);
  const is_level_up = move.move_learn_method === "level-up";
  const accuracy = move.accuracy;
  const damag_class = move.damage_class;
  const power = move.power;
  const type = move.type.name;
  const level = !is_level_up
    ? "-1"
    : move.level_learned_at === 0
    ? "-"
    : move.level_learned_at;
  return (
    <Container>
      <Left level={level} name={name} />
      <Right
        accuracy={accuracy}
        power={power}
        damag_class={damag_class}
        type={type}
      />
    </Container>
  );
}

export default MoveSummary;
