import { Component } from 'react';
import ImageGalleryItemStyled from './ImageGalleryItem.styled';
import Modal from 'components/modal';

class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };

  toggleModal = () => {
    this.setState(prev => ({
      modal: !prev.modal,
    }));
  };

  render() {
    const { modal } = this.state;
    const { url, name, largeImg } = this.props;
    return (
      <ImageGalleryItemStyled className="gallery-item">
        <img onClick={this.toggleModal} src={url} alt={name} />
        {modal && (
          <Modal
            closeModal={this.toggleModal}
            largeImg={largeImg}
            name={name}
          ></Modal>
        )}
      </ImageGalleryItemStyled>
    );
  }
}

export default ImageGalleryItem;
