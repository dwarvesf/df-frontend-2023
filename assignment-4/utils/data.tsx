import { Book } from '../types/app.types'

export const getData = () => {
  let dat: Book[] = []
  try {
    const items = localStorage.getItem('books')
    if (items) {
      dat = JSON.parse(items)
    }
  } catch (error) {
    console.log(error)
  }

  return dat
}
