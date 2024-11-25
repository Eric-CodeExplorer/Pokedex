import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 100%;
  height: 100%;
`;
const SpinPokeBall = styled.div`
  width: 64px;
  height: 64px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function LoaderFullPage() {
  return (
    <Container>
      <SpinPokeBall>
        <img src="/src/assets/icons/pokeball.svg" />
      </SpinPokeBall>
    </Container>
  );
}

export default LoaderFullPage;
