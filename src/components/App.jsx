import { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import ImageGallery from './imageGallery';
import getData from 'services/fetch';
import Button from './button';
import Loader from './loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [restPictures, setRestPictures] = useState(0);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(() => {
    return [];
  });
  const per_page = 3;
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }, [data]);

  useEffect(() => {
    if (!query) {
      return;
    }
    const firstRequest = async () => {
      setLoader(true);
      setData([]);
      const res = await getData({
        query: query,
        page: page,
        per_page: per_page,
      });
      await setData(res.hits);
      await setRestPictures(res.total - per_page);
      setLoader(false);
    };
    try {
      firstRequest();
    } catch (error) {
      console.log(error);
    }
  }, [per_page, query, page]);

  const fillQuery = query => {
    setQuery(query);
  };

  const loadMorePictures = async () => {
    setLoader(true);
    await setPage(prev => prev + 1);
    const res = await getData({
      query,
      page,
      per_page,
    });
    setData(prev => [...prev, ...res.hits]);
    setRestPictures(prev => prev - per_page);
    setLoader(false);
  };

  return (
    <div className="app">
      <SearchBar fillQuery={fillQuery}></SearchBar>

      {data.length > 0 && <ImageGallery data={data}></ImageGallery>}

      {loader && <Loader />}

      {restPictures >= per_page && (
        <Button loadMorePictures={loadMorePictures}></Button>
      )}
    </div>
  );
};
