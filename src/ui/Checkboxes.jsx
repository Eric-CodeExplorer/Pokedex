import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

function Checkboxes({ children }) {
  return <Container>{children}</Container>;
}

export default Checkboxes;
