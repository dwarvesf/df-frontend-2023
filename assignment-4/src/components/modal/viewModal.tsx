interface Book {
  id: number
  name: string
  author: string
  topic: string
}

function viewModal(item: Book, deleteItem: void) {
  return (
    <div className="text-center px-p50 mt-m30 leading-[1.5]">
      <a className=" text-primary font-bold flex  items-center mb-m30" href="/">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          className="font-bold"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
        </svg>{' '}
        <span className="">Back</span>
      </a>
      <h1 className="text-[18px] mb-m20">
        <span>Name: {item.name}</span>
      </h1>
      <p className="text-[18px]">
        <span>Author:</span> {item.author}
      </p>
      <p className="text-[18px] mb-m30">
        <span>Topic:</span> {item.topic}
      </p>
      <button
        type="button"
        onClick={() => deleteItem}
        className="text-primary font-bold underline"
      >
        Delete
      </button>
    </div>
  )
}

export default viewModal
