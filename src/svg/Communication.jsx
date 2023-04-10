import React from "react";

const Communication = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color ? color : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1395_4208"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill={color ? color : "#D9D9D9"} />
      </mask>
      <g mask="url(#mask0_1395_4208)">
        <path
          d="M8 14H16V13.45C16 12.7167 15.6333 12.125 14.9 11.675C14.1667 11.225 13.2 11 12 11C10.8 11 9.83333 11.225 9.1 11.675C8.36667 12.125 8 12.7167 8 13.45V14ZM12 10C12.55 10 13.021 9.804 13.413 9.412C13.8043 9.02067 14 8.55 14 8C14 7.45 13.8043 6.97933 13.413 6.588C13.021 6.196 12.55 6 12 6C11.45 6 10.9793 6.196 10.588 6.588C10.196 6.97933 10 7.45 10 8C10 8.55 10.196 9.02067 10.588 9.412C10.9793 9.804 11.45 10 12 10ZM2 22V4C2 3.45 2.196 2.979 2.588 2.587C2.97933 2.19567 3.45 2 4 2H20C20.55 2 21.021 2.19567 21.413 2.587C21.8043 2.979 22 3.45 22 4V16C22 16.55 21.8043 17.021 21.413 17.413C21.021 17.8043 20.55 18 20 18H6L2 22Z"
          fill={color ? color : "#C5C5C7"}
        />
      </g>
    </svg>
  );
};

export default Communication;
