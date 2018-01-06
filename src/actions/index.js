import axios from 'axios';
export const SEARCH_FOR_BOOKS = 'search_for_books';
export const GET_BOOK_DESC = 'GET_BOOK_DESC';

//const GOODREADS = "https://www.goodreads.com/search/index.xml";
const GOODREADS = "https://www.goodreads.com";
const GR_SEARCH = "/search/index.xml";
const GR_SHOW = "/book/show/";
const KEY = "?key=vVFRh9CNwReMOUE7rymyww";

export function searchForBooks(values, callback) {
  let result;
  if (!values.searchText || values.searchText === "") {
    console.error("*** ERROR *** In actions/searchForBooks." +
    "values.searchText: ", values.searchText);
  } else {
    const searchUrl = `${GOODREADS}${GR_SEARCH}${KEY}&q=${values.searchText}`;

    result = axios.get(searchUrl)
      .then((res) => {
        callback();
        return res;
      });
  }

  return {
    type: SEARCH_FOR_BOOKS,
    payload: result
  };
}

export function getBookDescription(bookId) {
  let result;

  if (!bookId || bookId === "") {
    console.error("*** ERROR *** In actions/getBookDescription." +
    "bookId: ", bookId);
  } else {
    const searchUrl = `${GOODREADS}${GR_SHOW}${bookId}.xml${KEY}`;
    result = axios.get(searchUrl);
  }

  return {
    type: GET_BOOK_DESC,
    payload: result
  };
}
