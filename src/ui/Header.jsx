import styled from "styled-components";
import Logo from "./Logo";
import NavBar from "./NavBar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-800);
  margin: 0 50px;
  padding: 0 20px;
  align-items: center;
  height: 140px;
  width: auto;
  display: flex;
  justify-content: space-between;
  color: var(--color-grey-300);
  user-select: none;
  @media only screen and (min-width: 768px) {
    padding: 0 50px;
    margin: 0 100px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <NavBar />
    </StyledHeader>
  );
}

export default Header;
