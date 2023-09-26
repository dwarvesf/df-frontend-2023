import React from "react";

function Table({ tableHeaders = [], tableDetails = [] }) {
  const renderTableHeader = tableHeaders.map((th, index) => {
    return (
      <th key={index} scope="col">
        {th}
      </th>
    );
  });

  const renderTableDetails = tableDetails.map((td, index) => {
    let tbDetails = [];
    for (const property in td) {
      tbDetails.push(<td key={td[property]}>{td[property]}</td>);
    }
    return <tr key={index}>{tbDetails}</tr>;
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
