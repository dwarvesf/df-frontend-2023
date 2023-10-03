import { PaginationProps } from '../types/Pagination.types'

const labelsForPagination = (
  currentPage: number,
  lastPage: number,
): string[] => {
  if (lastPage === 1) {
    // case only 1 page
    return ['1']
  }

  if (
    currentPage === 1 ||
    currentPage === lastPage ||
    lastPage <= currentPage
  ) {
    return ['1', '...', lastPage.toString()]
  }

  return ['1', '...', currentPage?.toString(), '...', lastPage.toString()]
}

const Pagination = ({ nItems, currentPage, setPage }: PaginationProps) => {
  const lastPage = Math.ceil(nItems / 4)
  const labels = labelsForPagination(currentPage, lastPage)

  return (
    <nav
      className="flex items-center justify-end my-4 mr-2"
      // aria-span="Table navigation"
    >
      <ul className="inline-flex -space-x-px text-sm h-8">
        <li className={`${currentPage === 1 ? 'cursor-not-allowed' : ''}`}>
          <button
            // href={`?page=${currentPage - 1}`}
            onClick={() => setPage(currentPage - 1)}
            className={`${
              currentPage === 1 ? 'pointer-events-none' : ''
            } flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Previous
          </button>
        </li>
        {labels.map((label, i) => {
          const currentPageCSS =
            'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
          const normalCSS =
            'leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'

          return (
            <li key={i}>
              <button
                // href={`?page=${Number(label) ? label : currentPage.toString()}`}
                onClick={() =>
                  setPage(Number(label) ? Number(label) : currentPage)
                }
                className={`${
                  Number(label) && Number(label) === currentPage
                    ? currentPageCSS
                    : normalCSS
                } ${
                  label === '...' ? 'pointer-events-none' : ''
                } flex items-center justify-center px-3 h-8 border border-gray-300 dark:border-gray-700`}
              >
                {label}
              </button>
            </li>
          )
        })}
        <li
          className={`${currentPage === lastPage ? 'cursor-not-allowed' : ''}`}
        >
          <button
            // href={`?page=${currentPage + 1}`}
            onClick={() => setPage(currentPage + 1)}
            className={`${
              currentPage === lastPage ? 'pointer-events-none' : ''
            } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
