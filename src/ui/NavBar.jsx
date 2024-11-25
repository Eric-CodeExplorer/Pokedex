import { NavLink } from "react-router-dom";
import translate from "../util/dictionary";
import LanguageSelector from "./LanguageSelector";
import styled from "styled-components";
import useLanguage from "../hooks/useLanguage";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
`;

function NavBar() {
  const { lang } = useLanguage();
  return (
    <Container>
      <NavLink to={`/${lang}/pokedex`}>{translate("pokedex", lang)}</NavLink>
      <LanguageSelector />
    </Container>
  );
}

export default NavBar;
