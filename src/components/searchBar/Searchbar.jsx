import { useState } from 'react';
import SearchbarStyled from './Searchbar.styled';
import { GoSearch } from 'react-icons/go';

const Searchbar = ({ fillQuery }) => {
  const [query, setQuery] = useState('');

  const searchRequest = e => {
    setQuery(e.target.value);
  };

  return (
    <SearchbarStyled className="searchbar">
      <form
        onSubmit={e => {
          e.preventDefault();
          fillQuery(query);
        }}
        className="searchForm"
      >
        <button type="submit" className="searchForm-button">
          <GoSearch size={22}></GoSearch>
        </button>
        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={searchRequest}
        />
      </form>
    </SearchbarStyled>
  );
};

export default Searchbar;
