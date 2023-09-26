
export default function Pagination({ booksPerPage, totalBooks, paginate }) {
    const pageNumbers = [];
    console.log(booksPerPage, totalBooks);
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pageNumbers.push[i];
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(page => {
                    console.log(page);
                    <li key={page} className="page">
                        <button onClick={() => { paginate(page) }}>{page}</button>
                    </li>
                })
                }
            </ul>
        </nav>
    )
}
