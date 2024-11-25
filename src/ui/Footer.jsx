import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-800);
  margin: 0 50px;
  padding: 0 20px;
  align-items: flex-start;
  height: 140px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-grey-300);
  @media only screen and (min-width: 768px) {
    padding: 2em 50px;
    margin: 0 100px;
  }
`;

const StyledDiv = styled.div`
  font-size: 0.8em;
`;

function Footer() {
  return (
    <StyledFooter>
      <StyledDiv>Author: Eric Yang</StyledDiv>
      <StyledDiv>Personal Project for Study Purpose</StyledDiv>
    </StyledFooter>
  );
}

export default Footer;
