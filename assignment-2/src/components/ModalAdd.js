import { useState } from 'react'

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15)
}

export default function ModalAdd({ SetModalAdd, books, setBooks }) {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [topic, setTopic] = useState('Programming')

  function handleAddBook(name, author, topic) {
    const newBook = {
      id: generateRandomString(),
      name: name,
      author: author,
      topic: topic,
    }
    setBooks([...books, newBook])
    setName('')
    setAuthor('')
    setTopic('Programming')
  }

  function handleClick(e) {}

  return (
    <div className="modal modal-add" onClick={handleClick}>
      <div className="form add-form">
        <h2 className="form-header">
          Add book
          <button
            className="close"
            type="button"
            onClick={() => SetModalAdd(false)}
          >
            &#x2716;
          </button>
        </h2>
        <form className="form__content">
          <div className="input-wrap">
            <h3 className="input-header">Name</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              type="text"
              placeholder="text"
              id="input-name"
              name="name"
            />
          </div>
          <div className="input-wrap">
            <h3 className="input-header">Author</h3>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input"
              type="text"
              placeholder="text"
              id="input-author"
              name="author"
            />
          </div>
          <div className="input-wrap">
            <h3 className="input-header">Topic</h3>
            <select
              id="input-topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="Programming">Programming</option>
              <option value="Databse">Databse</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>
          <div className="form__btn">
            <button
              className="btn btn-create"
              onClick={(e) => {
                e.preventDefault()
                handleAddBook(name, author, topic)
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
