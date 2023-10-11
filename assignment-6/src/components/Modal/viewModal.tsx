interface Book {
  id: number
  name: string
  author: string
  topic: string
}

export default function viewModal(item: Book, deleteItem: void) {
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
        />{' '}
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
