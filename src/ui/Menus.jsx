import { createContext, useContext, useState } from "react";
import { SiHotwire } from "react-icons/si";
import styled from "styled-components";
import Modal from "./Modal";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [cabinId, setCabinId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({})

  return <MenusContext.Provider value={{ cabinId, setCabinId, menuPosition, setMenuPosition }}>
    {children}
  </MenusContext.Provider>
}

function Toggle({ id }) {
  const { setCabinId, setMenuPosition, cabinId } = useContext(MenusContext);

  return <StyledToggle onClick={(e) => {
    if (cabinId !== id) {
      setCabinId(id)
      const rect = e.currentTarget.closest("button").getBoundingClientRect();
      setMenuPosition({ top: rect.y + rect.height - 8, right: window.innerWidth - rect.width / 2 - rect.x })
    } else {
      setCabinId(null)
    }

  }}><HiEllipsisVertical /></StyledToggle>

}

function List({ id, children }) {
  const { cabinId, menuPosition } = useContext(MenusContext);
  const showList = cabinId == id;

  if (showList) {
    return <StyledList position={{ x: menuPosition.right, y: menuPosition.top }}>{children}</StyledList>
  }

  return null;


}

function Button({ children, icon, handleClick }) {

  const { setCabinId } = useContext(MenusContext);

  const handleChooseOption = () => {
    handleClick?.();
    setCabinId(null);
  }
  return <li>
    <StyledButton onClick={handleChooseOption}>
      {icon}
      <span>
        {children}
      </span>
    </StyledButton>
  </li>

}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
