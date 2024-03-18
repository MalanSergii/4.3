import LoadMoreBtn from './Button.styled';

const Button = ({ loadMore }) => (
  <LoadMoreBtn onClick={loadMore}>Load more</LoadMoreBtn>
);

export default Button;
