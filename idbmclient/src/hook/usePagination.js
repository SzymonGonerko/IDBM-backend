import React, { useEffect, useState } from 'react';

export const usePagination = (data, itemsByPage) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  const previousPage = () => {
    setPage((p) => p - 1);
  };

  const nextPage = () => {
    if (list.length < page + 2) return null;
    setList((p) => {
      const [...arr] = p;
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
    setList(arr);
  }, []);

  return { list, page, nextPage, previousPage };
};
