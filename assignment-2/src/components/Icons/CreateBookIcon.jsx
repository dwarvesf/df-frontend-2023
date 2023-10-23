import React from "react";

function CreateBookIcon({ size = 20, color = "#000000", active = false }) {
  return (
    <svg
      width={size}
      height={size}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <path
        className="cls-1"
        d="m47,30V8c0-4.41-3.59-8-8-8H11C6.59,0,3,3.59,3,8v33c0,4.96,4.04,9,9,9h32c1.66,0,3-1.34,3-3s-1.34-3-3-3h-3.5v-6.15c3.7-.7,6.5-3.96,6.5-7.85ZM9,8c0-1.1.9-2,2-2h28c1.1,0,2,.9,2,2v22c0,1.1-.9,2-2,2H12c-1.05,0-2.06.19-3,.53V8Zm3,36c-1.65,0-3-1.35-3-3s1.35-3,3-3h21.5v6H12Z"
      />
      <path
        className="cls-1"
        d="m17,21.88h5v5.12c0,1.66,1.34,3,3,3s3-1.34,3-3v-5.12h5c1.66,0,3-1.34,3-3s-1.34-3-3-3h-5v-4.88c0-1.66-1.34-3-3-3s-3,1.34-3,3v4.88h-5c-1.66,0-3,1.34-3,3s1.34,3,3,3Z"
      />
    </svg>
  );
}

export default CreateBookIcon;
