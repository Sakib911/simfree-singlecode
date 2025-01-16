import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ShareSvg = (props) => {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.75 9V3m0 0h-6m6 0l-8 8m-3-6h-2.2c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C3.75 7.28 3.75 8.12 3.75 9.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C6.03 21 6.87 21 8.55 21h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311c.327-.642.327-1.482.327-3.162V14"
        stroke="#1B2638"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
