import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface Book {
  name: string
  author: string
  topic: string
}

interface EditModalProps {
  close: () => void
  item: Book
  editBook: (book: Book) => void
}

export default function EditModal({ close, item, editBook }: EditModalProps) {
  const [name, setName] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [topic, setTopic] = useState<string>('Programming')
  const [nameError, setNameError] = useState<boolean>(false)
  const [authorError, setAuthorError] = useState<boolean>(false)

  useEffect(() => {
    if (item) {
      setName(item.name || '')
      setAuthor(item.author || '')
      setTopic(item.topic || '')
    }
    // eslint-disable-next-line
  }, [])

  function validateInput() {
    if (name.trim() === '') {
      setNameError(true)
    }
    if (author.trim() === '') {
      setAuthorError(true)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value)
  }

  const getBookForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    validateInput()
    if (name.trim() === '' || author.trim() === '') {
      return
    }

    const book: Book = {
      name: formData.get('name') as string,
      author: formData.get('author') as string,
      topic: formData.get('topic') as string,
    }
    editBook(book)
    setName('')
    setAuthor('')
    setTopic('')
    close()
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
        name="topic"
        value={topic}
        onChange={handleChange}
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
          <h2 className="font-bold text-xl pb-8">Edit book</h2>
        </div>
        <br />
        <div className="modal-body">
          <form onSubmit={getBookForm}>
            <div className="relative z-0 w-full h-full mb-6 group ">
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setNameError(false)
                }}
                className="block py-3 px-0 w-full h-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                required
              />
              <label
                htmlFor="name"
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name{' '}
              </label>
              {nameError && (
                <p className="errorMessage">Author field is required.</p>
              )}
            </div>
            <div className="relative z-0 w-full h-full mb-6 group">
              <input
                name="author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value)
                  setAuthorError(false)
                }}
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
              {authorError && (
                <p className="errorMessage">Author field is required.</p>
              )}
            </div>
            <div className="relative z-0 w-full h-full mb-6 group">
              {displayTopic()}
              <label
                htmlFor="topic"
                className="mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Topic{' '}
              </label>
            </div>
            <p className="text-sm text-slate-500 ">
              Note: Remember to your edited book page
            </p>
            <br />
            <button
              type="submit"
              className="dark:bg-sky-500 dark:hover:bg-sky-700 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:focus:ring-sky-800"
            >
              Edit Book
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
