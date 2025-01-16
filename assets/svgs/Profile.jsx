import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ProfileSvg = ({ classes, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    className={classes}
  >
    <Path
      fill={color}
      d="M16.5 3a13 13 0 1 0 13 13 13.013 13.013 0 0 0-13-13ZM9.76 24.688a8 8 0 0 1 13.48 0 10.979 10.979 0 0 1-13.48 0ZM12.5 15a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm12.22 8.301a9.957 9.957 0 0 0-4.508-3.593 6 6 0 1 0-7.425 0A9.957 9.957 0 0 0 8.28 23.3a11 11 0 1 1 16.44 0Z"
    />
  </Svg>
);
