import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export default function App() {
  return (
    <StyledApp>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledApp>
  );
}
