import { storage } from "../utilities";

const topicStorage = [
  { id: "45d2895c", name: "Programming" },
  { id: "c4572c8d", name: "Database" },
  { id: "v457v289", name: "DevOps" },
  { id: "c4586x4c", name: "Frontend" },
  { id: "4d8648s6", name: "Backend" },
];

const bookStorage = [
  {
    id: "45728956",
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
  },
  {
    id: "94582634",
    name: "Desinging Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  {
    id: "45864286",
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "DevOps",
  },
  {
    id: "12345678",
    name: "Python for Beginners",
    author: "Mark Lutz",
    topic: "Python",
    action: "Read",
  },
  {
    id: "98765432",
    name: "JavaScript: The Definitive Guide",
    author: "Douglas Crockford",
    topic: "JavaScript",
    action: "Read",
  },
  {
    id: "87654321",
    name: "The C Programming Language",
    author: "Brian Kernighan, Dennis Ritchie",
    topic: "C",
    action: "Read",
  },
  {
    id: "76543210",
    name: "Learning Java",
    author: "Herbert Schildt",
    topic: "Java",
    action: "Read",
  },
  {
    id: "65432109",
    name: "Head First Java",
    author: "Kathy Sierra, Bert Bates",
    topic: "Java",
    action: "Read",
  },
  {
    id: "54321098",
    name: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    topic: "General programming",
    action: "Read",
  },
  {
    id: "43210987",
    name: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    topic: "Design patterns",
    action: "Read",
  },
  {
    id: "32109876",
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    topic: "Software development",
    action: "Read",
  },
  {
    id: "21098765",
    name: "The Art of Computer Programming",
    author: "Donald Knuth",
    topic: "Algorithms",
    action: "Read",
  },
  {
    id: "10987654",
    name: "Algorithms: Design and Analysis",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    topic: "Algorithms",
    action: "Read",
  },
  {
    id: "98765431",
    name: "Introduction to Algorithms",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    topic: "Algorithms",
    action: "Read",
  },
  {
    id: "87654320",
    name: "The Algorithm Design Manual",
    author: "Steven S. Skiena",
    topic: "Algorithms",
    action: "Read",
  },
  {
    id: "76543210",
    name: "Algorithms in C",
    author: "Robert Sedgewick, Kevin Wayne",
    topic: "Algorithms",
    action: "Read",
  },
  {
    id: "65432109",
    name: "Data Structures and Algorithms in Python",
    author: "Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser",
    topic: "Data structures, algorithms",
    action: "Read",
  },
  {
    id: "54321098",
    name: "Algorithms and Data Structures with Python",
    author: "John Guttag",
    topic: "Data structures, algorithms",
    action: "Read",
  },
  {
    id: "1234567890",
    name: "Node.js: The Complete Guide",
    author: "John Doe",
    topic: "Web development",
    action: "Read",
  },
  {
    id: "9876543210",
    name: "Python for Beginners",
    author: "Jane Doe",
    topic: "Data science",
    action: "Learn",
  },
  {
    id: "0987654321",
    name: "Java: The Complete Reference",
    author: "John Smith",
    topic: "Software development",
    action: "Buy",
  },
  {
    id: "1987654320",
    name: "C++: A Modern Approach",
    author: "Bjarne Stroustrup",
    topic: "Object-oriented programming",
    action: "Read",
  },
  {
    id: "2987654319",
    name: "HTML, CSS, and JavaScript: The Ultimate Guide",
    author: "W3Schools",
    topic: "Web development",
    action: "Learn",
  },
  {
    id: "3987654318",
    name: "React: The Complete Guide",
    author: "Dan Abramov",
    topic: "Web development",
    action: "Read",
  },
  {
    id: "4987654317",
    name: "Vue.js: The Complete Guide",
    author: "Evan You",
    topic: "Web development",
    action: "Learn",
  },
  {
    id: "5987654316",
    name: "Angular: The Complete Guide",
    author: "Max Stoiber",
    topic: "Web development",
    action: "Buy",
  },
  {
    id: "6987654315",
    name: "Swift: The Complete Guide",
    author: "Paul Hudson",
    topic: "Mobile development",
    action: "Read",
  },
  {
    id: "7987654314",
    name: "Kotlin: The Complete Guide",
    author: "Tachyon",
    topic: "Mobile development",
    action: "Learn",
  },
  {
    id: "8987654313",
    name: "JavaFX: The Complete Guide",
    author: "Paul Deitel",
    topic: "Desktop development",
    action: "Buy",
  },
  {
    id: "9987654312",
    name: "C#: The Complete Reference",
    author: "Herbert Schildt",
    topic: "Desktop development",
    action: "Read",
  },
  {
    id: "0087654311",
    name: "Ruby on Rails: The Complete Guide",
    author: "Michael Hartl",
    topic: "Web development",
    action: "Learn",
  },
  {
    id: "1087654310",
    name: "Django: The Complete Guide",
    author: "Aurelio De Rosa",
    topic: "Web development",
    action: "Buy",
  },
  {
    id: "2087654309",
    name: "Laravel: The Complete Guide",
    author: "Timothy Hunter",
    topic: "Web development",
    action: "Read",
  },
];
let seedState = {
  isSeeded: false,
};

export function generateData() {
  console.log("%c__Generate Data", "color: Blue;", "\n");
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
