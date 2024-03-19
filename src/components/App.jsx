import { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import ImageGallery from './imageGallery';
import getData from 'services/fetch';
import Button from './button';
import Loader from './loader';
import { nanoid } from 'nanoid';
export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [restPictures, setRestPictures] = useState(0);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const per_page = 12;
  const [error, setError] = useState('');
  if (error) {
    console.log(error);
  }
  // **** first request
  useEffect(() => {
    if (!query || page > 1) {
      return;
    }
    console.log('first request');
    const request = async () => {
      setLoader(true);
      await getData({ query, page, per_page })
        .then(data => {
          setData(
            ...data.hits.map((item, idx, arr) => {
              item.id = nanoid();
              return arr;
            })
          );
          setRestPictures(data.total - per_page);
        })
        .catch(error => setError(error));
      setLoader(false);
    };
    request();
  }, [data.total, page, query]);

  // *** load more pictures
  useEffect(() => {
    if (page === 1) {
      return;
    }

    const loadMorePictures = async () => {
      setLoader(true);
      await getData({ query, page: page, per_page }).then(data => {
        setData(prev => [
          ...prev,
          ...data.hits.map((item, idx, arr) => {
            item.id = nanoid();
            return item;
          }),
        ]);
        setRestPictures(prev => prev - per_page);
      });
      setLoader(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };
    loadMorePictures();
    console.log('load more');
  }, [page, query]);

  const fillQuery = query => {
    setPage(1);
    setQuery(query);
  };
  // **** smooth scroll
  useEffect(() => {
    if (data.length <= per_page) {
      return;
    }
    console.log('scroll');

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [data]);

  return (
    <div className="app">
      <SearchBar fillQuery={fillQuery}></SearchBar>

      {data.length > 0 && <ImageGallery data={data}></ImageGallery>}

      {loader && <Loader />}

      {restPictures > 0 && (
        <Button
          loadMorePictures={() => {
            setPage(prev => prev + 1);
          }}
        ></Button>
      )}
    </div>
  );
};
