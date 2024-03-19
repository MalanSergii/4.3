import { useEffect } from 'react';
import ModalStyled from './Modal.styled';

const Modal = ({ largeImg, name, closeModal }) => {
  useEffect(() => {
    function onEscapeClick(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }
    document.addEventListener('keydown', onEscapeClick);
    return () => {
      document.removeEventListener('keydown', onEscapeClick);
    };
  }, [closeModal]);

  const onBGclick = e => {
    if (e.target === e.currentTarget || e.code) {
      closeModal();
    }
  };

  return (
    <ModalStyled className="overlay" onClick={onBGclick}>
      <div onClick={onBGclick} className="modal">
        <img src={largeImg} alt={name} />
      </div>
    </ModalStyled>
  );
};

export default Modal;
