import * as actionTypes from "./actionTypes";
import BookAPI from "../dummy-APIs/BookAPI";

export const initialState = {
  //! NavDashboard
  isNavDashboardActive: false,
  //! BookState
  books: [],
  bookCounts: 0,
  //! TopicState
  topics: [],
  topicCounts: 0,
  //! loading
  loading: false,
  //! dark light mode
  isLight: true,
};

export function combineReducer(state, action) {
  switch (action.type) {
    //! navDashboardReducer
    case actionTypes.COLLAPSE_NAV_DASHBOARD:
      return {
        ...state,
        isNavDashboardActive: true,
      };
    case actionTypes.OPEN_NAV_DASHBOARD:
      return {
        ...state,
        isNavDashboardActive: false,
      };

    //! bookReducer
    case actionTypes.FETCH_ALL_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case actionTypes.CREATE_ONE_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case actionTypes.DELETE_ONE_BOOK:
      console.log("action.payload: ", action.payload);
      return {
        ...state,
        books: state.books.filter(
          (book) => String(book.id) !== String(action.payload.id)
        ),
        bookCounts: state.bookCounts - 1,
      };
    case actionTypes.FETCH_BOOKS_BY_FILTERS:
      return {
        ...state,
        books: action.payload.books,
        bookCounts: action.payload.bookCounts,
      };

    //! topicReducer
    case actionTypes.FETCH_ALL_TOPIC:
      return {
        ...state,
        topics: action.payload,
      };
    case actionTypes.CREATE_ONE_TOPIC:
      return {
        ...state,
        topics: [...state.topics, action.payload],
      };
    case actionTypes.DELETE_ONE_TOPIC:
      return {
        ...state,
        topics: action.payload,
      };
    case actionTypes.FETCH_TOPICS_BY_FILTERS:
      return {
        ...state,
        topics: action.payload,
      };
    //dark light mode
    case actionTypes.TOGGLE_DARK_LIGHT:
      return {
        ...state,
        isLight: !state.isLight,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
