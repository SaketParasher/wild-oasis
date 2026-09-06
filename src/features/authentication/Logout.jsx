
import { HiArrowRightStartOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

const Logout = () => {
    const { isLogingOut, logoutAction } = useLogout();

    return (
        <ButtonIcon disabled={isLogingOut} onClick={logoutAction} title='logout'>
            {isLogingOut ? <SpinnerMini /> : <HiArrowRightStartOnRectangle />}
        </ButtonIcon>
    )
}

export default Logout