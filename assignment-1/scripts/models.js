"use strict";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  deleteLocalStorage,
} from "./storage.js";

export class Book {
  id;

  constructor({ id, name, author, topic }) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.topic = topic;
  }

  static create(bookDoc) {
    const id = Date.now();

    const newBookDoc = new Book({
      id: id,
      name: bookDoc.name,
      author: bookDoc.author,
      topic: bookDoc.topic,
    });

    let bookDocArr = this._getBooks();

    bookDocArr.push(newBookDoc);

    //!! update bookDocArr into localStorage
    saveToLocalStorage("bookStorage", bookDocArr);

    return newBookDoc;
  }

  static findOneAndRemove(id) {
    let bookDocArr = this._getBooks();

    console.log("__Debugger__models\n:::nmodule :::id: ", id, "\n");
    const bookIndex = bookDocArr.findIndex((book) => book.id == id);
    console.log(
      "__Debugger__models\n:::nmodule :::bookIndex: ",
      bookIndex,
      "\n"
    );
    //! using Splice method Array to delete Element by index
    bookDocArr.splice(bookIndex, 1);

    //!! update bookDocArr into localStorage
    saveToLocalStorage("bookStorage", bookDocArr);
  }

  static findOneById(id) {
    let bookDocArr = this._getBooks();

    //! using Splice method Array to delete Element by index
    return bookDocArr.find((book) => book.id == id);
  }

  static _getBooks() {
    let bookDocArr = [];
    if (getFromLocalStorage("bookStorage")) {
      bookDocArr = getFromLocalStorage("bookStorage").map((book) =>
        this.parse(book)
      );
    }
    return bookDocArr;
  }

  //! parseTask is used to convert Object to Ins
  static parse(bookData) {
    const bookIns = new Book({
      id: bookData.id,
      name: bookData.name,
      author: bookData.author,
      topic: bookData.topic,
    });
    return bookIns;
  }
}

export class Topic {
  id;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static create(topicDoc) {
    const id = Date.now();

    const newTopicDoc = new Topic({
      id: id,
      name: topicDoc.name,
    });

    let topicDocArr = this._getTopics();

    topicDocArr.push(newTopicDoc);

    //!! update topicDocArr into localStorage
    saveToLocalStorage("topicStorage", topicDocArr);

    return newTopicDoc;
  }

  static findOneAndRemove(id) {
    let topicDocArr = this._getTopics();

    const topicIndex = topicDocArr.findIndex((topic) => topic.id == id);

    //! using Splice method Array to delete Element by index
    topicDocArr.splice(topicIndex, 1);

    //!! update topicDocArr into localStorage
    saveToLocalStorage("topicStorage", topicDocArr);
  }

  static findOneById(id) {
    let topicDocArr = this._getTopics();

    //! using Splice method Array to delete Element by index
    return topicDocArr.find((topic) => topic.id == id);
  }

  static _getTopics() {
    let topicDocArr = [];
    if (getFromLocalStorage("topicStorage")) {
      topicDocArr = getFromLocalStorage("topicStorage").map((topic) =>
        this.parse(topic)
      );
    }
    return topicDocArr;
  }

  //! parseTask is used to convert Object to Ins
  static parse(topicData) {
    const topicIns = new Topic({
      id: topicData.id,
      name: topicData.name,
      author: topicData.author,
      topic: topicData.topic,
    });
    return topicIns;
  }
}
