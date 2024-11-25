import styled from "styled-components";
import translate from "../util/dictionary";
import useLanguage from "../hooks/useLanguage";

const Container = styled.div`
  width: 350px;
  height: 50px;
  border: 1px solid transparent;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  box-shadow: var(--shadow-bar);
  margin: 10px 0;
  &:focus-within {
    box-shadow: var(--shadow-bar-focus);
  }
  &:hover {
    box-shadow: var(--shadow-bar-focus);
  }
  img {
    width: 25px;
    height: 25px;
    margin: 0 5px;
  }
`;

const StyledSearchBar = styled.input`
  padding: 1rem;
  background-color: transparent;
  border: 0px;
  border-radius: 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

function SearchBar({ value, setter }) {
  const { lang } = useLanguage();
  return (
    <Container>
      <img src="/src/assets/icons/search.svg" />
      <StyledSearchBar
        type="text"
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={translate("searchPokemon", lang)}
      />
    </Container>
  );
}

export default SearchBar;
