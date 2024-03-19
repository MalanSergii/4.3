import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import ImageGalleryStyled from './ImageGallery.styled';
import { useEffect } from 'react';

const ImageGallery = ({ data = [] }) => {
  useEffect(() => {}, [data]);
  return (
    <>
      <ImageGalleryStyled className="gallery">
        {data.map(item => (
          <ImageGalleryItem
            key={item.id}
            url={item.webformatURL}
            largeImg={item.largeImageURL}
          />
        ))}
      </ImageGalleryStyled>
    </>
  );
};

export default ImageGallery;
