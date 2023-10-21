export type TopicType = {
  id: number
  code: string
  name: string
}

export interface BookType {
  id: number
  name: string
  author: string
  topic: TopicType
}
export interface NewBookType {
  topicId: number
  name: string
  author: string
}
export interface UpdateBookType {
  id: number
  topicId: number
  name: string
  author: string
}
export interface CreateBookReq {
  data: NewBookType
}

export type NewBookResponse = {
  data: {
    id: number
    name: string
    author: string
    topic: TopicType
  }
}

export type DeleteBookResponse = {
  data: {
    message: string
  }
}
export interface BookInitialStateType {
  state: { bookData: BookType[] }
  deleteBook: (id: number) => void
  addBook: (book: NewBookType) => void
  editBook: (book: UpdateBookType) => void
}
