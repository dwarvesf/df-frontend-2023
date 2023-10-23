import React from "react";
import Pagination from "react-bootstrap/Pagination";
//! imp Hooks
// import { scrollToTop } from "../../hooks/scroll";

const PaginationComponent = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setProductsCountPerPage,
  alwaysShown = true,
  alwayScrollToTop = false,
}) => {
  const pagesCount =
    itemsCount && itemsPerPage ? Math.ceil(itemsCount / itemsPerPage) : 1;
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = (number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
    const loadingItems = itemsCount - (number - 1) * itemsPerPage;
    //! đang phát triển thêm tính năng loading theo tính toán
    console.log("loadingItems: ", loadingItems);
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage((currentPage) => currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage((currentPage) => currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      if (pagesCount < 1) {
        setCurrentPage(1);
      } else {
        setCurrentPage(pagesCount); //!-- async state effect
      }
    }
  };

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pagesCount)]?.map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2; //! Range between two Pages

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  // React.useEffect(() => {
  //   setProductsCountPerPage(
  //     itemsCount - (currentPage - 1) * itemsPerPage >= itemsPerPage
  //       ? itemsPerPage
  //       : itemsCount - (currentPage - 1) * itemsPerPage
  //   );
  // }, []);

  React.useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
