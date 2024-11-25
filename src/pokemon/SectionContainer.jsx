import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 50px; */
  justify-content: center;
  align-items: center;
  width: 100%;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

function SectionContainer({ id, children }) {
  return <Container id={id}>{children}</Container>;
}

export default SectionContainer;
