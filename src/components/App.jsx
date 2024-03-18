import { Component } from 'react';
import SearchBar from './searchBar';
import ImageGallery from './imageGallery';
import Loader from './loader';
import Button from './button';
import Modal from './modal';
import getData from 'services/fetch';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    per_page: 11,
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
    const res = await getData({
      query: this.state.query,
      page: 1,
      per_page: this.state.per_page,
    });
    this.setState(prev => ({
      data: res.hits,
      restPictures: res.total - this.state.per_page,
    }));
  };

  loadMorePictures = async () => {
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
  };

  render() {
    const { modal, loader, restPictures, per_page, data } = this.state;
    return (
      <div className="app">
        <SearchBar fillQuery={this.fillQuery}></SearchBar>
        <ImageGallery data={data}></ImageGallery>
        {loader && <Loader></Loader>}

        {restPictures >= per_page && (
          <Button loadMore={this.loadMorePictures}></Button>
        )}
      </div>
    );
  }
}
