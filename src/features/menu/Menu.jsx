import { useNavigate } from 'react-router-dom';
import useLogout from '../auth/useLogout';
import { ButtonSpinner } from '../../components/Spinner';
function Menu({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate();
  const { logout, isUserLoggingOut } = useLogout(setIsMenuOpen);

  return (
    <div
      className={`absolute right-8 top-[5.5rem] text-right bg-violet-20/95 text-violet-100 font-semibold text-regular-lg rounded-lg overflow-hidden divide-y-[0.01rem] divide-violet-100/30 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-[120%]'
      } transition-all `}
    >
      <div
        className='hover:bg-violet-100 hover:text-light-60 py-5 px-10 cursor-pointer'
        onClick={() => navigate('config')}
      >
        <p>Configuration</p>
      </div>

      <div
        className='block ml-auto hover:bg-violet-100 hover:text-light-60 p-5 px-10 cursor-pointer'
        onClick={logout}
      >
        {isUserLoggingOut ? <ButtonSpinner /> : <button>Logout</button>}
      </div>
    </div>
  );
}

export default Menu;
