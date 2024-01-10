/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user

  const { isLoading, isAuthenticated } = useUser();

  // 2. While loading, show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. If there is NO authenticated user, redirect back to login page

  if (!isAuthenticated && !isLoading) {
    navigate("/login");
    return;
  }

  // 4. If there is an authenticated user, render the app
  if (isAuthenticated) return children;
}
