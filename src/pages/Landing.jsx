import { useEffect, useState } from 'react';
import landingPageImg1 from '/landingPage1.png';
import landingPageImg2 from '/landingPage2.png';
import landingPageImg3 from '/landingPage3.png';
import Button from '../components/Button';

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

function Landing() {
  const [activeCarouselIndex, setActiveCarouselndex] = useState(0);
  const activeItem = carouselData[activeCarouselIndex];

  console.log(activeCarouselIndex);

  useEffect(() => {
    setInterval(changeCaruselItem, 3500);
    function changeCaruselItem() {
      setActiveCarouselndex((curr) =>
        curr === carouselData.length - 1 ? 0 : curr + 1,
      );
    }

    return () => clearInterval(changeCaruselItem);
  }, []);

  return (
    <div className='flex flex-col h-screen p-10'>
      <div className='flex flex-col items-center justify-center flex-1 gap-4 text-center'>
        <img src={activeItem.img} alt='carlousel image' className='w-[60%]' />
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
      <div className='flex flex-col gap-8 font-semibold text-small'>
        <Button>New Expense</Button>
        <Button variant='secondary'>Old Expense</Button>
      </div>
    </div>
  );
}
export default Landing;
