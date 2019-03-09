import React from "react";
import { IconFunc } from "./utils";

const icon = {
  add: {
    path: (
      <g fill="currentColor">
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          strokeLinejoin="miter"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeMiterlimit="10"
          x1="22"
          y1="12"
          x2="2"
          y2="12"
          strokeLinejoin="miter"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },
  "add-user": {
    path: (
      <g fill="currentColor" stroke="none">
        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </g>
    ),
    viewBox: "0 0 24 24"
  },
  "add-doc": {
    path: (
      <path
        d="M22,0H2C1.447,0,1,0.448,1,1v22c0,0.552,0.447,1,1,1h20c0.553,0,1-0.448,1-1V1C23,0.448,22.553,0,22,0z M16,13h-3v3h-2v-3H8v-2h3V8h2v3h3V13z"
        fill="currentColor"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "right-arrow": {
    path: (
      <path
        fill="currentColor"
        d="M7,23.414L5.586,22l10-10l-10-10L7,0.586l10.707,10.707c0.391,0.391,0.391,1.023,0,1.414L7,23.414z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "clock-02": {
    path: (
      <path
        fill="currentColor"
        d="M14.656 2.656A13.344 13.344 0 1 0 28 16 13.344 13.344 0 0 0 14.656 2.656zm0 24A10.656 10.656 0 1 1 25.344 16a10.656 10.656 0 0 1-10.688 10.656zm4.16-9.824L16 15.232V9.344a1.344 1.344 0 0 0-2.656 0v6.816a.864.864 0 0 0 .064.256 1.184 1.184 0 0 0 .096.224 1.152 1.152 0 0 0 .128.224l.224.16.128.128 3.456 2.016a1.344 1.344 0 0 0 .672.16 1.344 1.344 0 0 0 .672-2.496z"
      />
    ),
    viewBox: "0 0 32 32"
  },

  share: {
    path: (
      <path
        fill="currentColor"
        d="M13,15v6.4L23.4,11L13,0.6V7C8.4,7.2,0,9.1,0,20v3.7l1.9-3.2C4.3,16.4,6.7,15.1,13,15z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "framed-left-arrow": {
    path: (
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor" />
        <polyline fill="none" points=" 14,16 10,12 14,8 " />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  "framed-right-arrow": {
    path: (
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor" />
        <polyline fill="none" points=" 10,8 14,12 10,16  " />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  doc: {
    path: (
      <path
        fill="currentColor"
        d="M1,1v22c0,0.552,0.448,1,1,1h20c0.552,0,1-0.448,1-1V1c0-0.552-0.448-1-1-1H2C1.448,0,1,0.448,1,1z M12,18H5 v-2h7V18z M19,13H5v-2h14V13z M19,8H5V6h14V8z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  calendar: {
    path: (
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      >
        <line fill="none" x1="1" x2="23" y1="8" y2="8" />
        <rect
          height="19"
          width="22"
          fill="none"
          rx="2"
          ry="2"
          stroke="currentColor"
          x="1"
          y="3"
        />
        <line fill="none" x1="6" x2="6" y1="1" y2="4" />
        <line fill="none" x1="18" x2="18" y1="1" y2="4" />
      </g>
    ),
    viewBox: "0 0 24 24"
  },
  dots: {
    path: (
      <path
        fill="currentColor"
        d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "dots-01": {
    path: (
      <g fill="currentColor">
        <circle cx="10" cy="12" fill="currentColor" r="2" />
        <circle cx="3" cy="12" fill="currentColor" r="2" />
        <circle cx="17" cy="12" fill="currentColor" r="2" />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  explore: {
    path: (
      <path
        fill="currentColor"
        d="M19,2 L5,2 C3.9,2 3,2.9 3,4 L3,18 C3,19.1 3.9,20 5,20 L9,20 L12,23 L15,20 L19,20 C20.1,20 21,19.1 21,18 L21,4 C21,2.9 20.1,2 19,2 L19,2 Z M13.88,12.88 L12,17 L10.12,12.88 L6,11 L10.12,9.12 L12,5 L13.88,9.12 L18,11 L13.88,12.88 L13.88,12.88 Z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  refresh: {
    path: (
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      >
        <path
          d="M22,12c0,5.5-4.5,10-10,10 S2,17.5,2,12S6.5,2,12,2c3.9,0,7.3,2.2,8.9,5.5"
          fill="none"
          strokeLinecap="butt"
        />
        <polyline fill="none" points="21.8,1.7 21,7.6 15,6.8 " />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  star: {
    path: (
      <path
        fill="currentColor"
        d="M23.144,8.541,16.063,7.512,12.9,1.1a1.041,1.041,0,0,0-1.794,0L7.937,7.512.856,8.541A1,1,0,0,0,.3,10.246L5.425,15.24,4.216,22.293a1,1,0,0,0,1.451,1.054L12,20.018l6.333,3.329a1,1,0,0,0,1.451-1.054L18.575,15.24,23.7,10.246a1,1,0,0,0-.554-1.705Z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "time-lapse": {
    path: (
      <path
        fill="currentColor"
        d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
      />
    ),
    viewBox: "0 0 24 24"
  },

  "edit-01": {
    path: (
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      >
        <polyline
          fill="none"
          points="13 6 2 6 2 30 26 30 26 19"
          stroke="currentColor"
        />
        <polygon fill="none" points="16 20 10 22 12 16 26 2 30 6 16 20" />
        <line fill="none" strokeLinecap="butt" x1="22" x2="26" y1="6" y2="10" />
      </g>
    ),
    viewBox: "0 0 32 32"
  },

  avatar: {
    path: (
      <g fill="currentColor">
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    ),
    viewBox: "0 0 128 128"
  },

  search: {
    path: (
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="currentColor"
        stroke="currentColor"
      >
        <line
          x1="22"
          y1="22"
          x2="15.656"
          y2="15.656"
          fill="none"
          strokeMiterlimit="10"
        />
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
        />
      </g>
    ),
    viewBox: "0 0 24 24"
  },

  "up-and-down": {
    path: (
      <g fill="currentColor">
        <path
          d="M17.156,8.4,12,4.28,6.844,8.4,5.594,6.843l5.781-4.625a1,1,0,0,1,1.249,0l5.781,4.625Z"
          fill="currentColor"
        />
        <path d="M12,22a1,1,0,0,1-.625-.219L5.594,17.156l1.25-1.562L12,19.72,17.156,15.6l1.25,1.562-5.781,4.625A1,1,0,0,1,12,22Z" />
      </g>
    ),
    viewBox: "0 0 24 24"
  }
};

export default IconFunc(icon);
