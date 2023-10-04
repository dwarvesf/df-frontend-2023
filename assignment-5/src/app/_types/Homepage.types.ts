export interface Book {
  id: number
  name: string
  author: string
  topic: string
}

export interface TableDataType {
  key: React.Key
  '#': number
  name: string
  author: string
  topic: string
  action: 'Delete'
}

export interface AddBookInputs {
  name: string
  author: string
  topic: string
}
