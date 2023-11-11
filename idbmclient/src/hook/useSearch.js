import axios from 'axios';
import { useParse } from './useParse';

export const useSearch = () => {
  const { parse } = useParse();

  const searchByTitle = async title => {
    let val = await axios({
      method: 'post',
      url: 'https://localhost:7089/Movies' + '/' + "getByTitle",
      data: {title}
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
      });;
    return val;
  };

  const searchByGenre = async (genres) => {
    let val = await axios({
      method: 'post',
      url: 'https://localhost:7089/Movies' + '/' + "getByGenres",
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
    });;
  return val;
  };

  return { searchByTitle, searchByGenre };
};
