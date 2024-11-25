import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  @media only screen and (min-width: 768px) {
    padding: 30px 0;
  }
`;

function Filters({ children }) {
  return <Container>{children}</Container>;
}

export default Filters;
