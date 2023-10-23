import React from "react";

function Table({ tableHeaders = [], tableDetails = [] }) {
  const renderTableHeader = tableHeaders?.map((th, index) => {
    return (
      <th key={index} scope="col">
        {th}
      </th>
    );
  });

  const renderTableDetails = tableDetails?.map((td, index) => {
    let tbDetails = [];
    Object.keys(td).forEach(function (key, index) {
      tbDetails.push(<td key={`td-${td.idx}-${index + 1}`}>{td[key]}</td>);
    });
    return <tr key={td.idx}>{tbDetails}</tr>;
  });

  return (
    <table className="styled-table">
      <thead>
        <tr className="">{renderTableHeader}</tr>
      </thead>
      <tbody>{renderTableDetails}</tbody>
    </table>
  );
}

export default Table;
