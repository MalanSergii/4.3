import { Audio } from 'react-loader-spinner';
const Loader = () => {
  return (
    <Audio
      wrapperClass="loader"
      height="400"
      width="400"
      color="yellow"
      ariaLabel="loading"
    ></Audio>
  );
};

export default Loader;
