import { useState } from 'react';
import ImageGalleryItemStyled from './ImageGalleryItem.styled';
import Modal from 'components/modal';

const ImageGalleryItem = ({ url, name, largeImg }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  return (
    <ImageGalleryItemStyled>
      <img
        className="gallery-item"
        onClick={toggleModal}
        src={url}
        alt={name}
      />
      {modal && (
        <Modal closeModal={toggleModal} largeImg={largeImg} name={name}></Modal>
      )}
    </ImageGalleryItemStyled>
  );
};

export default ImageGalleryItem;
