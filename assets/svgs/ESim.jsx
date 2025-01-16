import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ESimSvg = ({ classes, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    className={classes}
  >
    <Path
      fill={color}
      d="m27.207 10.293-7-7A1 1 0 0 0 19.5 3h-12a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V11a1 1 0 0 0-.293-.707ZM25.5 27h-18V5h11.586l6.414 6.414V27Zm-3-13h-12a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Zm-1 9h-2v-4a1 1 0 0 0-2 0v4h-2v-4a1 1 0 0 0-2 0v4h-2v-7h10v7Z"
    />
  </Svg>
);
