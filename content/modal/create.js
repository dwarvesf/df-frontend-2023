import "./modal-style.css";
const CreateModal = ({ close, addBook }) => {
  let getBookForm = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const book = {
      name: formData.get("name"),
      author: formData.get("author"),
      topic: formData.get("topic"),
    };
    addBook(book);
  };

  const topics = [
    "Machine Learning",
    "Database",
    "Frontend",
    "Backend",
    "DevOps",
    "Programming",
    "Artificial Intelligence",
    "Big Data",
    "Cloud Computing",
    "Blockchain",
    "Internet of Things",
    "Cybersecurity",
    "Software Development",
    "UX/UI Design",
    "Computer Networking",
  ];
  let displayTopic = () => {
    return topics.map((topic) => {
      return <option value={topic}>{topic}</option>;
    });
  };

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
          <form action="" onSubmit={getBookForm}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" className="modal-input" required />
            <br />
            <label htmlFor="author">Author</label>
            <input type="text" name="author" className="modal-input" required />
            <br />
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic" className="modal-input" required>
              <option>Select a topic</option>
              {displayTopic()}
            </select>
            <br />

            <button type="submit" className="addBookBtn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
