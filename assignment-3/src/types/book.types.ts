export interface Book {
  id: string | number
  name: string
  author: string
  topic: string
}

export type BookList = Array<Book>