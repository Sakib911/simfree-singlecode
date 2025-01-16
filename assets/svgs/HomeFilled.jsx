import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const HomeFilled = ({ classes, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    className={classes}
  >
    <Path
      fill={color}
      d="M28.5 15v12a1 1 0 01-1 1h-7a1 1 0 01-1-1v-6.5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5V27a1 1 0 01-1 1h-7a1 1 0 01-1-1V15a2 2 0 01.586-1.414l10-10a2 2 0 012.828 0l10 10A2 2 0 0128.5 15z"
    />
  </Svg>
);
