import React from "react";

function BarsIcon({ size = 20, color = "#000000", active = false }) {
  return (
    <svg
      width={size}
      height={size}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      {!active ? (
        <g id="icon__bars">
          <path
            id="_exit"
            data-name=" exit"
            className="cls-1"
            d="m30.66,25l12.32-12.32c1.4-1.4,1.4-3.66,0-5.06l-.6-.6c-1.4-1.4-3.66-1.4-5.06,0l-12.32,12.32L12.68,7.02c-1.4-1.4-3.66-1.4-5.06,0l-.6.6c-1.4,1.4-1.4,3.66,0,5.06l12.32,12.32-12.32,12.32c-1.4,1.4-1.4,3.66,0,5.06l.6.6c1.4,1.4,3.66,1.4,5.06,0l12.32-12.32,12.32,12.32c1.4,1.4,3.66,1.4,5.06,0l.6-.6c1.4-1.4,1.4-3.66,0-5.06l-12.32-12.32Z"
          />
        </g>
      ) : (
        <>
          <rect
            className="cls-1"
            y="5"
            width="50"
            height="8"
            rx="3.58"
            ry="3.58"
          />
          <rect
            className="cls-1"
            y="21"
            width="50"
            height="8"
            rx="3.58"
            ry="3.58"
          />
          <rect
            className="cls-1"
            y="37"
            width="50"
            height="8"
            rx="3.58"
            ry="3.58"
          />
        </>
      )}
    </svg>
  );
}

export default BarsIcon;
