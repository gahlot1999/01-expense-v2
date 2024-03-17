import { useEffect, useState } from 'react';

const carouselData = [
  {
    title: 'Gain total control of your money',
    subTitle: 'Become your own money manager and make every cent count',
  },
  {
    title: 'Know where your money goes',
    subTitle:
      'Track your transaction easily,with categories and financial report ',
  },
  {
    title: 'Planning ahead',
    subTitle: 'Setup your budget for each category so you in control',
  },
];

function Landing() {
  const [activeCarouselIndex, setActiveCarouselndex] = useState(0);
  const activeItem = carouselData[activeCarouselIndex];

  useEffect(() => {
    setInterval(changeCaruselItem, 2000);
    function changeCaruselItem() {
      setActiveCarouselndex((curr) =>
        curr === carouselData.length - 1 ? 0 : curr + 1,
      );
    }

    return () => clearInterval(changeCaruselItem);
  }, []);

  return (
    <div>
      <div>
        <div>
          <img
            src={`/public/landingPage${activeCarouselIndex + 1}.png`}
            alt=''
          />
        </div>
        <div>
          <p>{activeItem.title}</p>
          <p>{activeItem.subTitle}</p>
        </div>
        <div>***</div>
      </div>
      <div>
        <button>New Expense</button>
        <button>Old Expense</button>
      </div>
    </div>
  );
}

export default Landing;
