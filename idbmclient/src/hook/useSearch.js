import axios from 'axios';
import { useParse } from './useParse';

let main = 'https://localhost:7089/Movies';

export const useSearch = () => {
  const { parse } = useParse();

  const getSomeTitles = async (title) => {
    let val = await axios({
      method: 'post',
      url: main + '/' + 'getSomeTitles',
      data: { title }
    }).then((r) => {
      const arr = r.data;
      return arr;
    });
    return val;
  };

  const getSomeDirectors = async (director) => {
    let val = await axios({
      method: 'post',
      url: main + '/' + 'getSomeDirectors',
      data: { director }
    }).then((r) => {
      const arr = r.data;
      return arr;
    });
    return val;
  };

  const searchByTitle = async (title) => {
    let val = await axios({
      method: 'post',
      url: main + '/' + 'getByTitle',
      data: { title }
    }).then((r) => {
      const arr = r.data.map((el) => {
        return {
          ...el,
          genre: parse(el.genre),
          director: parse(el.directors),
          countries: parse(el.countries),
          actors: parse(el.actors)
        };
      });
      return arr;
    });
    return val;
  };

  const searchByGenre = async (genres) => {
    let val = await axios({
      method: 'post',
      url: main + '/' + 'getByGenres',
      data: genres
    }).then((r) => {
      const arr = r.data.map((el) => {
        return {
          ...el,
          genre: parse(el.genre),
          director: parse(el.directors),
          countries: parse(el.countries),
          actors: parse(el.actors)
        };
      });
      return arr;
    });
    return val;
  };

  const searchByDirector = async (director) => {
    console.log(director);
    let val = await axios({
      method: 'post',
      url: main + '/' + 'getByDirector',
      data: { director }
    }).then((r) => {
      const arr = r.data.map((el) => {
        return {
          ...el,
          genre: parse(el.genre),
          director: parse(el.directors),
          countries: parse(el.countries),
          actors: parse(el.actors)
        };
      });
      return arr;
    });
    return val;
  };

  return { searchByTitle, searchByGenre, getSomeTitles, getSomeDirectors, searchByDirector };
};
