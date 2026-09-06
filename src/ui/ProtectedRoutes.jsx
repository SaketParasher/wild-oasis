import { useEffect } from "react";
import { useGetCurrentUser } from "../features/authentication/useGetCurrentUser";
import styled from "styled-components";

import Spinner from './Spinner';
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {

    const FullPage = styled.div`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const navigate = useNavigate();

    // get the current user
    const { isLoading, isAuthenticated } = useGetCurrentUser();

    // if not authenticated navigate to the login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    // while getting the user show the spinner
    if (isLoading) return <FullPage><Spinner /></FullPage>

    // if current user exists then return the children 
    if (isAuthenticated) return children;

}

export default ProtectedRoutes