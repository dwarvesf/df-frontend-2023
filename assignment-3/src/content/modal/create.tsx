import './modal-style.css'
import React, { FormEvent } from 'react'

interface Book {
  name: string
  author: string
  topic: string
}

const CreateModal = ({
  close,
  addBook,
}: {
  close: () => void
  addBook: (book: Book) => void
}) => {
  const getBookForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const book: Book = {
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
  const displayTopic = (): JSX.Element => {
    const options = topics.map((topic) => {
      return (
        <option key={topic} value={topic}>
          {topic}
        </option>
      )
    })

    return <div>{options}</div>
  }

  return (
    <div id="create-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="closeBtn" onClick={close}>
            &times;
          </button>
          <h2>Add book</h2>
        </div>
        <br />

        <div className="modal-body">
          <form onSubmit={getBookForm}>
            <label htmlFor="name">
              Name{' '}
              <input type="text" name="name" className="modal-input" required />
            </label>
            <br />
            <label htmlFor="author">
              Author
              <input
                type="text"
                name="author"
                className="modal-input"
                required
              />
            </label>

            <br />
            <label htmlFor="topic">
              Topic
              <select id="topic" name="topic" className="modal-input" required>
                <option>Select a topic</option>
                {displayTopic()}
              </select>
            </label>

            <br />

            <button type="submit" className="addBookBtn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateModal
