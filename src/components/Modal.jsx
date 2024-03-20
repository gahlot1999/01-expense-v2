import { createPortal } from 'react-dom';

function Modal({ children, onClose, variant = 'middle' }) {
  let activeStyles = '';
  switch (variant) {
    case 'middle':
      activeStyles =
        'fixed top-[50%] left-[50%] bg-light-100 translate-x-[-50%] translate-y-[-50%] rounded-xl transition-all shadow-sm p-10';
      break;

    case 'bottom':
      activeStyles =
        'w-full fixed bottom-0 bg-light-100 rounded-[2.5rem_2.5rem_0_0] transition-all shadow-sm p-10';
      break;

    default:
      break;
  }

  return createPortal(
    <div className='fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-dark-100/10 z-50 transition-all'>
      <div className={`${activeStyles}`}>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
