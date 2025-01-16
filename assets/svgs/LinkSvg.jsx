import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const LinkSvg = (props) => {
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
        d="M13.458 18.364l-1.415 1.414a5 5 0 11-7.07-7.07l1.413-1.415m12.728 1.414l1.415-1.414a5 5 0 00-7.071-7.071l-1.415 1.414M9.25 15.5l7-7"
        stroke="#1B2638"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
