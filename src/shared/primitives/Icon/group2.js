import React from "react";
import { IconFunc } from "./utils";

const icon = {
  funnel: {
    path: (
      <g fill="currentColor">
        <path d="M22,0H2A1,1,0,0,0,1,1V4a1,1,0,0,0,.293.707L9,12.414V23a1,1,0,0,0,1.6.8l4-3A1,1,0,0,0,15,20V12.414l7.707-7.707A1,1,0,0,0,23,4V1A1,1,0,0,0,22,0Z" />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  "left-arrow": {
    path: (
      <path
        fill="currentColor"
        d="M17,23.414L6.293,12.707c-0.391-0.391-0.391-1.023,0-1.414L17,0.586L18.414,2l-10,10l10,10L17,23.414z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  delete: {
    path: (
      <path
        fill="currentColor"
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "delete-01": {
    path: (
      <path
        fill="currentColor"
        d="M5 4c0-1.496 1.397-3 3-3h4c1.603 0 3 1.504 3 3h2a1 1 0 0 1 0 2v10.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 16.5V6a1 1 0 1 1 0-2h2zm2 0h6c0-.423-.536-1-1-1H8c-.464 0-1 .577-1 1zM5 6v10.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V6H5zm2 3a1 1 0 1 1 2 0v5a1 1 0 0 1-2 0V9zm4 0a1 1 0 1 1 2 0v4.8a1 1 0 0 1-2 0V9z"
      />
    ),
    viewBox: "0 0 20 20"
  },

  clock: {
    path: (
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="currentColor"
        stroke="currentColor"
      >
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points="12,10 12,14 16,14"
        />
        <circle
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          cx="12"
          cy="14"
          r="9"
        />
        <line fill="none" strokeMiterlimit="10" x1="9" y1="1" x2="15" y2="1" />
        <line fill="none" strokeMiterlimit="10" x1="12" y1="1" x2="12" y2="2" />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  close: {
    path: (
      <g>
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="19"
          y1="5"
          x2="5"
          y2="19"
          strokeLinejoin="round"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="19"
          y1="19"
          x2="5"
          y2="5"
          strokeLinejoin="round"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  copy: {
    path: (
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "copy-01": {
    path: (
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M6.48 2l-.045.094c-.24.501.017.906.574.906h1.982c.566 0 .807-.395.558-.883L9.489 2H11v1a1 1 0 0 1-.99 1H5.99A.993.993 0 0 1 5 3V2h1.48l.045-.094c.24-.5.883-.906 1.444-.906.558 0 1.216.405 1.46.883L9.49 2h3.015A1.49 1.49 0 0 1 14 3.491V13.51A1.5 1.5 0 0 1 12.504 15H3.496A1.49 1.49 0 0 1 2 13.509V3.49A1.5 1.5 0 0 1 3.496 2H6.48zM12 12v-.505a.494.494 0 0 0-.5-.495c-.268 0-.5.222-.5.495V12h-.505a.494.494 0 0 0-.495.5c0 .268.222.5.495.5H11v.505c0 .28.224.495.5.495.268 0 .5-.222.5-.495V13h.505c.28 0 .495-.224.495-.5 0-.268-.222-.5-.495-.5H12zM4 6.5c0 .268.22.5.491.5h5.018a.5.5 0 0 0 0-1H4.491A.5.5 0 0 0 4 6.5zm0 2c0 .268.224.5.5.5h7c.27 0 .5-.224.5-.5 0-.268-.224-.5-.5-.5h-7c-.27 0-.5.224-.5.5zm0 2c0 .268.22.5.491.5h5.018a.5.5 0 0 0 0-1H4.491a.5.5 0 0 0-.491.5zm0 2c0 .268.222.5.495.5h2.01c.28 0 .495-.224.495-.5 0-.268-.222-.5-.495-.5h-2.01a.494.494 0 0 0-.495.5z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "comment--colored": {
    path: (
      <g fill="none" fillRule="evenodd">
        <path
          fill="#C85000"
          d="M23.548 31H28v-4H17.523C14.711 24.127 13 20.321 13 16.164 13 7.214 20.813 0 30.5 0 40.188 0 48 7.28 48 16.164c0 4.81-2.25 9.084-5.813 12.023-.25.2-.374.468-.25.802.5 1.736 1.688 3.005 2.938 3.74.313.134.5.468.5.935C45.375 34.332 45 35 44 35c-3.125 0-6.688-1.27-9.063-2.872-.25-.134-.437-.2-.75-.134-1.187.2-2.437.334-3.687.334A18.65 18.65 0 0 1 23.548 31z"
        />
        <path
          fill="#FB8332"
          d="M3.134 45.722c1.254-.736 2.445-2.01 2.946-3.75.125-.336 0-.604-.25-.805C2.256 38.22 0 33.933 0 29.11 0 20.2 7.835 12.9 17.55 12.9c9.716 0 17.552 7.234 17.552 16.21 0 8.91-7.836 16.211-17.551 16.211a22.37 22.37 0 0 1-3.698-.334c-.314-.067-.502 0-.753.134C10.72 46.727 7.146 48 4.012 48c-1.003 0-1.38-.67-1.38-1.34 0-.469.189-.804.502-.938zM10 31a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
      </g>
    ),
    viewBox: "0 0 48 48"
  },

  "expand-01": {
    path: (
      <path
        fill="currentColor"
        d="M32 0v13l-5-5-6 6-3-3 6-6-5-5zM14 21l-6 6 5 5h-13v-13l5 5 6-6z"
      />
    ),
    viewBox: "0 0 32 32"
  },
  shrink: {
    path: (
      <path
        fill="currentColor"
        d="M14 18v13l-5-5-6 6-3-3 6-6-5-5zM32 3l-6 6 5 5h-13v-13l5 5 6-6z"
      />
    ),
    viewBox: "0 0 32 32"
  },

  minus: {
    path: <rect height="4" width="28" fill="currentColor" x="2" y="14" />,
    viewBox: "0 0 32 32"
  },

  edit: {
    path: (
      <g fill="currentColor">
        <path d="M20,24H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,24,20,24z" />
        <path d="M18.7,9.3l1.6-1.6c0.4-0.4,0.4-1,0-1.4l-3.6-3.6c-0.4-0.4-1-0.4-1.4,0l-1.6,1.6L18.7,9.3z" />
        <path
          fill="currentColor"
          d="M12.3,5.7l-8,8C4.1,13.9,4,14.1,4,14.4V18c0,0.6,0.4,1,1,1h3.6c0.3,0,0.5-0.1,0.7-0.3l8-8L12.3,5.7z"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  pen: {
    path: (
      <g fill="currentColor">
        <path
          d="M1.915,17.329L1.02,21.804c-0.066,0.328,0.037,0.667,0.273,0.903C1.482,22.896,1.737,23,2,23&#xA;&#x9;c0.065,0,0.131-0.006,0.196-0.02l4.475-0.895L1.915,17.329z"
        />
        <polygon
          fill="currentColor"
          points="13.586,5 11,7.586 3,15.586 8.414,21 19,10.414 "
        />
        <path
          d="M22.707,5.293l-4-4c-0.391-0.391-1.023-0.391-1.414,0L15,3.586L20.414,9l2.293-2.293&#xA;&#x9;C23.098,6.316,23.098,5.684,22.707,5.293z"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  info: {
    path: (
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="currentColor"
        stroke="currentColor"
      >
        <circle
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          cx="12"
          cy="12"
          r="11"
        />
        <polyline
          fill="none"
          strokeMiterlimit="10"
          points=" 10,11 12,11 12,17 "
        />
        <line
          fill="none"
          strokeMiterlimit="10"
          x1="10"
          y1="17"
          x2="14"
          y2="17"
        />
        <circle
          data-stroke="none"
          cx="12"
          cy="7"
          r="1"
          strokeLinejoin="miter"
          strokeLinecap="square"
          stroke="none"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  "up-arrow": {
    path: (
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="currentColor"
        stroke="currentColor"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="22,17 12,7 2,17 "
          transform="translate(0, 0)"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  "down-arrow": {
    path: (
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="currentColor"
        stroke="currentColor"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="2,7 12,17 22,7 "
          transform="translate(0, 0)"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  warning: {
    path: (
      <path
        fill="currentColor"
        d="M12 0l-12 12 12 12 12-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  error: {
    path: (
      <g stroke="currentColor">
        <circle
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeMiterlimit="10"
          cx="12"
          cy="12"
          r="11"
          strokeLinejoin="round"
        />
        <line
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="12"
          y1="7"
          x2="12"
          y2="13"
          strokeLinejoin="round"
        />
        <circle
          fill="currentColor"
          data-stroke="none"
          cx="12"
          cy="17"
          r="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  check: {
    path: (
      <polygon
        points="9 21 1 13 4 10 9 15 21 3 24 6 9 21"
        fill="currentColor"
      />
    ),
    viewBox: "0 0 24 24"
  }
};

export default IconFunc(icon);
