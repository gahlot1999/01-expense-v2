import { useNavigate } from 'react-router-dom';
import backBtnBlack from '../assets/arrow-left-black.png';
import backBtnWhite from '../assets/arrow-left-white.png';

function HeaderWithBackButton({
  title,
  variant = 'white',
  backBtn = true,
  children,
  navigateTo = -1,
  replace = false,
}) {
  const navigate = useNavigate();

  return (
    <div className='p-10 flex items-center justify-between'>
      {backBtn ? (
        <img
          src={variant === 'black' ? backBtnBlack : backBtnWhite}
          alt='back button icon'
          className='w-[2.2rem] cursor-pointer'
          onClick={() => navigate(navigateTo, { replace: replace })}
        />
      ) : (
        <p></p>
      )}

      <p
        className={`${
          variant === 'black' ? 'text-dark-75' : 'text-light-100'
        } text-title-sm text-center font-semibold`}
      >
        {title}
      </p>
      <span className='basis-[2.2rem] shrink-0'>{children}</span>
    </div>
  );
}

export default HeaderWithBackButton;
