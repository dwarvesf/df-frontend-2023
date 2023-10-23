import * as actionTypes from "./actionTypes";
import BookAPI from "../dummy-APIs/BookAPI";
import TopicAPI from "../dummy-APIs/TopicAPI";
import Topic from "../pages/Topic";

export const createContextActions = (dispatch) => {
  return {
    //! navDashboardContextActions
    navDashboard: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_NAV_DASHBOARD });
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_NAV_DASHBOARD });
      },
    },
    //! bookContextActions
    book: {
      fetchAll: () => {
        const response = BookAPI.fetchAll();
        dispatch({
          type: actionTypes.FETCH_ALL_BOOK,
          payload: response,
        });
      },
      create: (bookData) => {
        const response = BookAPI.create(bookData);
        dispatch({
          type: actionTypes.CREATE_ONE_BOOK,
          payload: response,
        });
      },
      findIdAndDelete: (id) => {
        const response = BookAPI.findOneAndRemove(id);
        dispatch({ type: actionTypes.DELETE_ONE_BOOK, payload: response });
      },
      fetchBooksByFilter: (page, perPage, { search = "" }) => {
        const response = BookAPI.fetchBooksByFilters(page, perPage, { search });
        dispatch({
          type: actionTypes.FETCH_BOOKS_BY_FILTERS,
          payload: response,
        });
      },
    },
    //! topicContextActions
    topic: {
      fetchAll: () => {
        const response = TopicAPI.fetchAll();
        dispatch({
          type: actionTypes.FETCH_ALL_TOPIC,
          payload: response,
        });
      },
      create: (topicData) => {
        const response = TopicAPI.create(topicData);
        dispatch({
          type: actionTypes.CREATE_ONE_TOPIC,
          payload: response,
        });
      },
      findIdAndDelete: (id) => {
        const response = TopicAPI.findOneAndRemove(id);
        dispatch({ type: actionTypes.DELETE_ONE_TOPIC, payload: response });
      },
      fetchTopicsByFilter: ({ search = "" }) => {
        const response = TopicAPI.fetchTopicsByFilters({ search });
        dispatch({
          type: actionTypes.FETCH_TOPICS_BY_FILTERS,
          payload: response,
        });
      },
    },
    darkMode: {
      toggle: () => {
        dispatch({
          type: actionTypes.TOGGLE_DARK_LIGHT,
        });
      },
    },
  };
};
