import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ESimFilled = ({ classes, color = "#FFAF00" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    className={classes}
  >
    <Path
      fill={color}
      d="M27.207 10.293l-7-7A1 1 0 0019.5 3h-12a2 2 0 00-2 2v22a2 2 0 002 2h18a2 2 0 002-2V11a1 1 0 00-.293-.707zM23.5 24a1 1 0 01-1 1h-2a.5.5 0 01-.5-.5v-4.466a1.022 1.022 0 00-.934-1.031 1 1 0 00-1.066 1v4.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-4.47a1.022 1.022 0 00-.934-1.03 1 1 0 00-1.066 1v4.5a.5.5 0 01-.5.5h-2a1 1 0 01-1-1V17a1 1 0 011-1h12a1 1 0 011 1v7z"
    />
  </Svg>
);
