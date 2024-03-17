import { useNavigate } from 'react-router-dom';
import backBtn from '../assets/arrow-left.png';

function HeaderWithBackButton({ title }) {
  const navigate = useNavigate();
  return (
    <div className='relative'>
      <img
        src={backBtn}
        alt='back button icon'
        className='w-[3rem] absolute top-[50%] left-4 translate-y-[-50%]'
        onClick={() => navigate(-1)}
      />
      <p className='text-light-100 text-title-sm text-center'>{title}</p>
    </div>
  );
}

export default HeaderWithBackButton;
