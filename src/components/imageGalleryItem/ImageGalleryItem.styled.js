import styled from 'styled-components';

const ImageGalleryItemStyled = styled.li`
  .gallery-item {
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    height: 260px;
    object-fit: cover;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
  .gallery-item:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

export default ImageGalleryItemStyled;
