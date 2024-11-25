import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const StyledAppLayout = styled.div`
  background-color: var(--color-red-700);
`;

const Container = styled.div`
  background-color: var(--color-grey-pokeball);
  padding: 50px 0;
  min-height: calc(100vh - 140px * 2);
  @media only screen and (min-width: 768px) {
    margin: 0 100px;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
