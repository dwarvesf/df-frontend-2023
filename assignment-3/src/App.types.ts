export interface Book {
  name: string
  author: string
  topic: string
}

export interface TableDataType {
  key: React.Key
  name: string
  author: string
  topic: string
  action: 'Delete'
}
