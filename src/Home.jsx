import styled from "styled-components";
import translate from "./util/dictionary";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-width: 325px;
    max-height: 120px;
  }
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

function Home() {
  const { lang } = useParams();
  return (
    <Container>
      <img src="/src/assets/home_logo.png" />
      <Title>{translate("homepage", lang)}</Title>
    </Container>
  );
  // return <VarietySlider />;
}

export default Home;
