import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import useLanguage from "../hooks/useLanguage";

const StyledImage = styled.img`
  height: 50px;
  width: 95px;
  object-fit: contain;
  @media only screen and (min-width: 768px) {
    height: 100px;
    width: 190px;
  }
`;

function Logo() {
  const { lang } = useLanguage();
  return (
    <Link to={`/${lang}/home`}>
      <StyledImage src="/src/assets/logo.png" alt="pokedex logo" />
      <h1 style={{ display: "none" }}>Pokedex</h1>
    </Link>
  );
}

export default Logo;
