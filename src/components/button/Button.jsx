import { useState } from 'react';
import LoadMoreBtn from './Button.styled';

const Button = ({ loadMorePictures }) => {
  const [active, setActive] = useState(true);
  return (
    <LoadMoreBtn
      disabled={!active}
      onClick={async () => {
        await setActive(false);
        await loadMorePictures();
        await setActive(true);
      }}
    >
      Load more
    </LoadMoreBtn>
  );
};

export default Button;
