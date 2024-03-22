import { useEffect, useRef, useState } from 'react';
import landingPageImg1 from '../../assets/landingPage1.png';
import landingPageImg2 from '../../assets/landingPage2.png';
import landingPageImg3 from '../../assets/landingPage3.png';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import configIcon from '../../assets/settings.svg';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import supabase from '../../services/Supabase';
import Menu from '../menu/Menu';

const carouselData = [
  {
    title: 'Planning ahead',
    subTitle: 'Setup your budget for each category so you in control',
    img: landingPageImg3,
  },
  {
    title: 'Gain total control of your money',
    subTitle: 'Become your own money manager and make every cent count',
    img: landingPageImg1,
  },
  {
    title: 'Know where your money goes',
    subTitle:
      'Track your transaction easily,with categories and financial report ',
    img: landingPageImg2,
  },
];

function Home() {
  const menuRef = useRef(null);
  const queryClient = useQueryClient();
  const userName = useMemo(() => {
    const userData = queryClient.getQueryData(['user']);
    return userData ? userData.user_metadata.name : 'User';
  }, [queryClient]);

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeCarouselIndex, setActiveCarouselndex] = useState(0);
  const activeItem = carouselData[activeCarouselIndex];

  useEffect(() => {
    setInterval(changeCaruselItem, 3500);
    function changeCaruselItem() {
      setActiveCarouselndex((curr) =>
        curr === carouselData.length - 1 ? 0 : curr + 1,
      );
    }

    return () => clearInterval(changeCaruselItem);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [menuRef, setIsMenuOpen, isMenuOpen]);

  return (
    <div className='flex flex-col h-screen p-10 relative'>
      <img
        ref={menuRef}
        src={configIcon}
        onClick={() => {
          setIsMenuOpen((curr) => !curr);
        }}
        alt='config icon'
        height={32}
        width={32}
        className='absolute right-8 top-8 cursor-pointer'
      />

      <div className='text-center'>
        <p className='text-regular-lg text-dark-50'>
          Welcome
          <br />
          <span className='text-title-md font-semibold text-dark-75'>
            {userName}
          </span>
        </p>
      </div>
      <div className='flex flex-col items-center justify-center flex-1 gap-4 text-center'>
        <img src={activeItem.img} alt='carlousel image' className='w-[15rem]' />
        <div className='grid grid-rows-[9rem_6rem_4rem] items-center justify-items-center'>
          <p className='font-bold leading-[1.1] text-title-lg text-dark-100'>
            {activeItem.title}
          </p>
          <p className='text-dark-25 max-w-[22rem] leading-[1.25] text-small'>
            {activeItem.subTitle}
          </p>
          <div className='flex items-center gap-12'>
            {carouselData.map((el, i) => (
              <div
                onClick={() => setActiveCarouselndex(i)}
                className={`cursor-pointer rounded-full ${
                  i === activeCarouselIndex
                    ? 'h-6 w-6 bg-violet-100'
                    : 'h-3 w-3 bg-violet-40'
                }`}
                key={crypto.randomUUID()}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8 '>
        <Button onClick={() => navigate('createbudget')}>New Budget</Button>
        <Button variant='secondary' onClick={() => navigate('budgets')}>
          Old Budget
        </Button>
      </div>

      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
export default Home;
