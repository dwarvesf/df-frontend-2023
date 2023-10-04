import { Book } from '../_types/Homepage.types'

export const defaultBooks: Book[] = [
  {
    id: 1,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: 2,
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: 3,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: 4,
    name: 'A song of ice and fire',
    author: 'George R. R. Martin',
    topic: 'Fantasy',
  },
  {
    id: 5,
    name: 'Lord of the Rings',
    author: 'J. R. R. Tolkien',
    topic: 'Fantasy',
  },
  {
    id: 6,
    name: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    topic: 'Detective',
  },
  {
    id: 7,
    name: 'Romance of the Three Kingdoms',
    author: 'Luo Guanzhong',
    topic: 'History',
  },
]

export const topics: string[] = [
  'Programming',
  'Database',
  'DevOps',
  'Fantasy',
  'Detective',
  'History',
]

export const emptyBook: Book = {
  id: -1,
  name: '',
  author: '',
  topic: '',
}
