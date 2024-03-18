import axios from 'axios';

const API_KEY = '25084920-0e8ebadd3b3d898ff3835027a';

const getData = ({ query, page, per_page }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    )
    .then(data => data.data);
};

export default getData;
