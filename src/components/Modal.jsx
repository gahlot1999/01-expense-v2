import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div className='fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-dark-100/10 z-50 transition-all'>
      <div className='fixed top-[50%] left-[50%] bg-light-100 translate-x-[-50%] translate-y-[-50%] rounded-xl transition-all shadow-sm p-10'>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
