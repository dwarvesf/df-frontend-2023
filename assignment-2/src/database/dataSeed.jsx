import { storage } from "../utilities";

const topicStorage = [
  { id: 123, name: "Programming" },
  { id: 234, name: "Database" },
  { id: 345, name: "DevOps" },
  { id: 456, name: "Frontend" },
  { id: 567, name: "Backend" },
];

const bookStorage = [
  {
    id: 123,
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
  },
  {
    id: 234,
    name: "Desinging Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  { id: 345, name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" },
];
let seedState = {
  isSeeded: false,
};

export function generateData() {
  console.log(
    "%c__Generate Data",
    "color: Blue;",
    "\n"
  );
  //! initial or get data
  if (storage.getFromLocalStorage("seedStorage")) {
    seedState = storage.getFromLocalStorage("seedStorage");
  } else {
    storage.saveToLocalStorage("seedStorage", seedState);
  }
  if (!seedState.isSeeded) {
    //! seed all of Datas just once
    storage.saveToLocalStorage("topicStorage", topicStorage);
    storage.saveToLocalStorage("bookStorage", bookStorage);

    seedState.isSeeded = true;
    storage.saveToLocalStorage("seedStorage", seedState);
  }
}
