import { Component } from 'react';
import SearchbarStyled from './Searchbar.styled';
import { GoSearch } from 'react-icons/go';

class Searchbar extends Component {
  state = {
    query: '',
  };

  searchRequest = e => {
    this.setState({
      query: e.target.value,
    });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchbarStyled className="searchbar">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.fillQuery(this.state.query);
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
            onChange={this.searchRequest}
          />
        </form>
      </SearchbarStyled>
    );
  }
}

export default Searchbar;
