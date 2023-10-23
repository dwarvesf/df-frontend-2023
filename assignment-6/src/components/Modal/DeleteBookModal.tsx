import { Book } from '../interface/book'

interface DeleteModalProps {
  close: () => void
  item: Book
  delBook: (book: Book) => void
}

export default function DeleteModal({
  close,
  item,
  delBook,
}: DeleteModalProps): React.JSX.Element {
  return (
    <div
      id="delete-modal"
      className="text-center dark:text-black bg-black-rgba fixed left-0 top-0 overflow-auto pt-60 w-full h-full z-10 "
    >
      <div className="p-16 bg-gray-100 w-2/5 m-auto">
        <div className="modal-header">
          <button
            className="float-right text-lg font-extrabold"
            onClick={close}
          >
            &times;
          </button>
          <h2>Delete book</h2>
        </div>
        <br />

        <div className="modal-body">
          <p>
            Do you want to delete <b>{item.name}</b> book?
          </p>
          <button
            type="button"
            className=" text-white m-6 bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
            onClick={() => delBook(item)}
          >
            Delete
          </button>
          <button type="button" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
