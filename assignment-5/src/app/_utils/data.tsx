import { Book } from '../_types/Homepage.types'

export const getData = () => {
  let dat: Book[] = []
  try {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('books')
      if (items) {
        dat = JSON.parse(items)
      }
    }
  } catch (error) {
    console.log(error)
  }

  return dat
}
