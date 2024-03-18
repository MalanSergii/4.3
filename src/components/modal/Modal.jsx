import { Component } from 'react';
import ModalStyled from './Modal.styled';

class Modal extends Component {
  state = {};

  componentDidMount = e => {
    document.addEventListener('keydown', this.onEscapeClick);
  };

  componentWillUnmount = e => {
    document.removeEventListener('keydown', this.onEscapeClick);
  };

  onEscapeClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBGclick = e => {
    if (e.target === e.currentTarget || e.code) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg, name } = this.props;
    return (
      <ModalStyled className="overlay" onClick={this.onBGclick}>
        <div onClick={this.onBGclick} className="modal">
          <img src={largeImg} alt={name} />
        </div>
      </ModalStyled>
    );
  }
}

export default Modal;
