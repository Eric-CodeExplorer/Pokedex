import styled from "styled-components";
import { getEVGain, getName } from "../util/helpers";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Item({ stat, value, lang }) {
  const { stats } = useContext(AppContext);
  const name = getName(stats[stat].names, lang);
  return (
    <div>
      {name} + {value}
    </div>
  );
}

function EVGain({ stats, lang }) {
  const ev_gains = getEVGain(stats);
  return (
    <Container>
      {Object.keys(ev_gains).map((stat) => (
        <Item stat={stat} value={ev_gains[stat]} lang={lang} key={stat} />
      ))}
    </Container>
  );
}

export default EVGain;
