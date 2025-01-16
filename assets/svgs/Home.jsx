import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const HomeSvg = ({ classes, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    className={classes}
  >
    <Path
      fill={color}
      d="m27.914 13.585-10-10a2 2 0 0 0-2.828 0l-10 10A1.983 1.983 0 0 0 4.5 15v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-7h4v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V15a1.985 1.985 0 0 0-.586-1.415ZM26.5 26h-6v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7h-6V15l10-10 10 10v11Z"
    />
  </Svg>
);
