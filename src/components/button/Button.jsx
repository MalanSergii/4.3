import LoadMoreBtn from './Button.styled';

const Button = ({ loadMorePictures }) => {
  return <LoadMoreBtn onClick={loadMorePictures}>Load more</LoadMoreBtn>;
};

export default Button;
