import { useEffect, useState } from 'react';
import landingPageImg1 from '/landingPage1.png';
import landingPageImg2 from '/landingPage2.png';
import landingPageImg3 from '/landingPage3.png';

const carouselData = [
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
  {
    title: 'Planning ahead',
    subTitle: 'Setup your budget for each category so you in control',
    img: landingPageImg3,
  },
];

function Landing() {
  const [activeCarouselIndex, setActiveCarouselndex] = useState(0);
  const activeItem = carouselData[activeCarouselIndex];

  console.log(activeCarouselIndex);

  useEffect(() => {
    setInterval(changeCaruselItem, 2500);
    function changeCaruselItem() {
      setActiveCarouselndex((curr) =>
        curr === carouselData.length - 1 ? 0 : curr + 1,
      );
    }

    return () => clearInterval(changeCaruselItem);
  }, []);

  return (
    <div className='h-screen p-10 flex flex-col justify-between'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <img src={activeItem.img} alt='carlousel image' className='w-[40%]' />
        <div className='grid grid-rows-[9rem_6rem_4rem] items-center justify-items-center'>
          <p className='font-bold leading-[1.1] text-title-lg text-dark-100'>
            {activeItem.title}
          </p>
          <div className='max-w-[22rem] m-auto'>
            <p className='text-dark-25 leading-[1.1] text-small'>
              {activeItem.subTitle}
            </p>
          </div>
          <div className='flex items-center gap-12'>
            {carouselData.map((el, i) => (
              <div
                onClick={() => setActiveCarouselndex(i)}
                className={`cursor-pointer rounded-full ${
                  i === activeCarouselIndex
                    ? 'h-8 w-8 bg-violet-100'
                    : 'h-4 w-4 bg-violet-40'
                }`}
                key={crypto.randomUUID()}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8 text-tiny font-semibold'>
        <button className='py-5 rounded-[1.6rem] bg-violet-100 text-light-80'>
          New Expense
        </button>
        <button className='py-5 rounded-[1.6rem] bg-violet-20 text-violet-100'>
          Old Expense
        </button>
      </div>
    </div>
  );
}

export default Landing;
