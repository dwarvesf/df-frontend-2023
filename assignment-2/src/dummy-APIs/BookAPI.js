import { models } from "../database";

const bookAPI = {
  //! Just suppose to get data from database
  fetchAll() {
    const data = models.Book.fetchBooks();
    return data;
  },
  create(bookData) {
    const book = models.Book.create(bookData);
    return book;
  },
  findOneAndRemove(id) {
    const book = models.Book.findOneAndRemove(id);
    return book;
  },
  fetchBooksByFilters(page, perPage, filterOpts) {
    const bookDocArr = models.Book.fetchOrdersByFilters(
      page,
      perPage,
      filterOpts
    );
    return bookDocArr;
  },
};

export default bookAPI;
