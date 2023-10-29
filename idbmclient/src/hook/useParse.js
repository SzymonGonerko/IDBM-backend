import React from 'react';

export const useParse = () => {


    const parse = (string) => {
        let str;
        try {
          str = JSON.parse(string.replaceAll("'", '"'));
        } catch (error) {
          return string;
        }
        return str;
      }

      return {parse}
}