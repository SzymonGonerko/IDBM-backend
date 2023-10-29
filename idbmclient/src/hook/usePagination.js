import React, { useEffect, useState } from 'react';

export const usePagination = (data, itemsByPage) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  const previousPage = () => {
    setPage((p) => p - 1);
  };

  const showMore = (goToNextPage) => {
    let counter = 0;
    list[page].forEach((el) => {
      if (el !== undefined) {
        el.isVisibile !== undefined ? counter++ : null;
      }
    });
    setList((p) => {
      const [...arr] = p;
      for (let i = 0; i < counter + 3; i++) {
        if (arr[page][i]) {
          arr[page][i].isVisibile = true;
        } else {
          goToNextPage();
        }
      }
      return arr;
    });
  };

  const howManyLeft = () => {
    let counter = 0;
    list.forEach((el) => {
      el.forEach((el) => {
        if (el !== undefined) {
          el.isVisibile == undefined ? counter++ : null;
        }
      });
    });
    return counter;
  };

  const nextPage = () => {
    if (list.length < page + 2) return null;
    setList((p) => {
      const [...arr] = p;
      for (let i = 0; i < 4; i++) {
        arr[page + 1][i].isVisibile = true;
      }
      return arr;
    });
    setPage((p) => p + 1);
  };

  useEffect(() => {
    const arr = [];
    const numberOfPages = Math.trunc(data.length / itemsByPage) + 1;
    const itemsByOnePage = data.length / numberOfPages;

    let counter = 0;
    for (let i = 0; i < numberOfPages; i++) {
      arr.push([]);
      for (let j = 0; j < itemsByOnePage; j++) {
        arr[i].push(data[counter]);
        counter++;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (arr[0][i]) {
        arr[0][i].isVisibile = true;
      }
    }
    setList(arr);
  }, []);

  return { list, page, nextPage, previousPage, howManyLeft, showMore };
};
