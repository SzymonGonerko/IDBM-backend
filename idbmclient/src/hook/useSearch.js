import axios from 'axios';
import { useParse } from './useParse';

let main = 'https://localhost:7089/Movies'

export const useSearch = () => {
  const { parse } = useParse();


  const getInitData = async () => {
    let titles = (await axios.get(main + '/' + "getAllTitle")).data
    let directors = (await axios.get(main + '/' + "getAllDirectors")).data
    console.log(titles)
    console.log(directors)
    return {titles, directors}
  }


  const searchByTitle = async title => {
    let val = await axios({
      method: 'post',
      url: main + '/' + "getByTitle",
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
      url: main + '/' + "getByGenres",
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

  return { searchByTitle, searchByGenre, getInitData };
};
