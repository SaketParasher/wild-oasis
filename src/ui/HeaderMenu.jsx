import styled from "styled-components"
import Logout from "../features/authentication/Logout"
import ButtonIcon from "./ButtonIcon"
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { useDarkMode } from "../context/DarkMode.context"

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap:0.4rem;
`

const HeaderMenu = () => {

    const navigate = useNavigate();
    const { isDarkMode, setDarkMode } = useDarkMode();


    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate("/account")} title="Account">
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <ButtonIcon
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    onClick={() => setDarkMode(prev => !prev)}>
                    {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
                </ButtonIcon>
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    )
}

export default HeaderMenu