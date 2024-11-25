import styled from "styled-components";
import translate from "../util/dictionary";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function GenderRate({ rate, lang }) {
  if (rate === -1) {
    return <Container>{translate("genderless", lang)}</Container>;
  }
  const female = translate("female", lang);
  const male = translate("male", lang);
  const female_rate = (rate / 8).toFixed(2);
  const male_rate = 1 - female_rate;
  return (
    <Container>
      <div>{`${male}: ${male_rate * 100}%`}</div>
      <div>{`${female}: ${female_rate * 100}%`}</div>
    </Container>
  );
}

export default GenderRate;
