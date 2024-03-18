import { Component } from 'react';
import SearchBar from './searchBar';
import ImageGallery from './imageGallery';
import getData from 'services/fetch';
import Button from './button';
import Loader from './loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    per_page: 12,
    restPictures: null,
    loader: false,
    data: [],
    error: null,
  };
  componentDidMount = () => {};

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        this.firstRequest();
      } catch (error) {
        console.log(error);
      }
    }
  }

  fillQuery = query => {
    this.setState({ query });
  };

  firstRequest = async () => {
    this.setState({ loader: true });
    const res = await getData({
      query: this.state.query,
      page: 1,
      per_page: this.state.per_page,
    });
    this.setState(prev => ({
      data: res.hits,
      restPictures: res.total - this.state.per_page,
    }));
    this.setState({ loader: false });
  };

  loadMorePictures = async () => {
    this.setState({ loader: true });
    await this.setState(prev => ({ page: prev.page + 1 }));
    const res = await getData({
      query: this.state.query,
      page: this.state.page,
      per_page: this.state.per_page,
    });

    this.setState(prev => ({
      data: [...prev.data, ...res.hits],
      restPictures: prev.restPictures - this.state.per_page,
    }));
    this.setState({ loader: false });
  };

  render() {
    const { per_page, restPictures, data, loader } = this.state;
    return (
      <div className="app">
        <SearchBar fillQuery={this.fillQuery}></SearchBar>
        {data.length > 0 && <ImageGallery data={data}></ImageGallery>}
        {loader && <Loader />}
        {restPictures >= per_page && (
          <Button loadMorePictures={this.loadMorePictures}></Button>
        )}
      </div>
    );
  }
}
