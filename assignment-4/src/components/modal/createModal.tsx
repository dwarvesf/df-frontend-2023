import React, { FormEvent } from 'react'

interface Book {
  id: number
  name: string
  author: string
  topic: string
}
export default function CreateModal({
  close,
  addBook,
}: {
  close: () => void
  addBook: (book: Book) => void
}) {
  const getBookForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let i = 1
    const form = event.currentTarget
    const formData = new FormData(form)

    const book: Book = {
      id: i++,
      name: formData.get('name') as string,
      author: formData.get('author') as string,
      topic: formData.get('topic') as string,
    }
    addBook(book)
  }

  const topics: Array<string> = [
    'Machine Learning',
    'Database',
    'Frontend',
    'Backend',
    'DevOps',
    'Programming',
    'Artificial Intelligence',
    'Big Data',
    'Cloud Computing',
    'Blockchain',
    'Internet of Things',
    'Cybersecurity',
    'Software Development',
    'UX/UI Design',
    'Computer Networking',
  ]
  const options = topics.map((topic) => {
    return (
      <option key={topic} value={topic}>
        {topic}
      </option>
    )
  })

  const displayTopic = (): JSX.Element => {
    return (
      <select
        required
        id="topic"
        name="topic"
        className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
      >
        <option value="">Select a topic</option>
        {options}
      </select>
    )
  }

  return (
    <div
      id="create-modal"
      className="bg-black-rgba fixed left-0 top-0 overflow-auto pt-60 w-full h-full z-10"
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
          <form onSubmit={getBookForm}>
            <div className="relative z-0 w-full h-full mb-6 group">
              <input
                id="name"
                name="name"
                type="text"
                className="block py-3 px-0 w-full h-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                required
              />
              <label
                htmlFor="name"
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name{' '}
              </label>
            </div>
            <div className="relative z-0 w-full h-full mb-6 group">
              <input
                id="author"
                name="author"
                type="text"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer "
                required
              />
              <label
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                htmlFor="author"
              >
                Author{' '}
              </label>
            </div>
            <div className="relative z-0 w-full h-full mb-6 group">
              {displayTopic()}
              <label
                htmlFor="topic"
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Topic{' '}
              </label>
            </div>
            <button
              type="submit"
              className="addBookBtn text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
