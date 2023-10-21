import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book } from '../interface/book'
import { options } from '../constant/topic'
import { BookSchema, BookSchemaType } from '../schema/BookSchema'

interface CreateModalProps {
  close: () => void
  addBook: (book: Book) => void
}

export default function CreateModal({
  close,
  addBook,
}: CreateModalProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      name: '',
      author: '',
      topic: 'Select a topic',
    },
  })

  const getBookForm: SubmitHandler<BookSchemaType> = () => {
    const idBook = Math.floor(Math.random() * 1000)

    const book: Book = {
      id: idBook,
      name: watch('name'),
      author: watch('author'),
      topic: watch('topic'),
    }
    addBook(book)
  }

  const displayTopic = (): JSX.Element => {
    return (
      <select
        required
        id="topic"
        {...register('topic')}
        className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
      >
        <option value="">Select a topic</option>
        {options}
      </select>
    )
  }

  return (
    <div
      id="create-modal"
      className="text-black bg-black-rgba fixed left-0 top-0 overflow-auto pt-60 w-full h-full z-10"
    >
      <div className="modal-content p-16 bg-gray-100 w-2/5 m-auto">
        <div className="modal-header">
          <button
            className="float-right text-lg font-extrabold"
            onClick={close}
          >
            &times;
          </button>
          <h2 className="font-bold text-xl pb-8">Add book</h2>
        </div>
        <br />
        <div className="modal-body">
          <form onSubmit={handleSubmit(getBookForm)}>
            <div className="relative z-0 w-full h-full mb-6 group ">
              <input
                id="name"
                {...register('name')}
                disabled={isSubmitting}
                placeholder=""
                type="text"
                className="block py-3 px-0 w-full h-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                required
              />
              <label
                htmlFor="name"
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name{' '}
              </label>
            </div>
            {errors.name && (
              <span className="text-red-800 block mt-2">
                {errors.name?.message}
              </span>
            )}
            <div className="relative z-0 w-full h-full mb-6 group">
              <input
                id="author"
                {...register('author')}
                disabled={isSubmitting}
                placeholder=""
                type="text"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-red-600 peer "
                required
              />
              <label
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                htmlFor="author"
              >
                Author{' '}
              </label>
            </div>
            {errors.author && (
              <span className="text-red-800 block mt-2">
                {errors.author?.message}
              </span>
            )}
            <div className="relative z-0 w-full h-full mb-6 group">
              {displayTopic()}
              <label
                htmlFor="topic"
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Topic{' '}
              </label>
            </div>
            <button
              type="submit"
              className="dark:bg-sky-500 dark:hover:bg-sky-700 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:focus:ring-sky-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
