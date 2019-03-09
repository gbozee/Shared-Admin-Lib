import { keyframes } from "@emotion/core";

export const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

export const fadeOut = keyframes`
from {
    opacity: 1;
    transform: translate3d(0, -10%, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -30%, 0);
  }
`;

export const slideLeft = keyframes`
  100% { 
    transform: translateX(-66.6666%);  
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0);
  }
`;

export const glideUp = keyframes`
  0% {
    transform: translateY(50%);
    opacity: 0;
  }
  40% {
    transform: translateY(20%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const glideUpSmall = keyframes`
  0% {
    transform: translateY(5%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const zoom = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`;

export const slideInLeft = keyframes`
  from {
    transform: translateX(-20%);
  }
  to {
    transform: translateX(0);
  }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const move1 = keyframes`
  100% { 
    transform: translateX(-40%);  
  }
`;

export const move2 = keyframes`
  0%    { left: 0; }
  100%  { left: -200%; }
`;
