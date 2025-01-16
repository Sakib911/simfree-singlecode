import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const GiftIcon = ({ classes, color = "#1B2638" }) => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <G clipPath="url(#clip0_384_5712)">
        <Path
          d="M8 4.667H5a1.667 1.667 0 010-3.334c2.333 0 3 3.334 3 3.334zm0 0h3a1.667 1.667 0 100-3.334c-2.333 0-3 3.334-3 3.334zm0 0v10M1.333 9.333h13.334M1.333 6.8v5.733c0 .747 0 1.12.146 1.406.127.25.331.455.582.582.285.146.659.146 1.406.146h9.066c.747 0 1.12 0 1.406-.146.25-.127.454-.331.582-.582.146-.286.146-.659.146-1.406V6.8c0-.747 0-1.12-.146-1.405a1.334 1.334 0 00-.582-.583c-.286-.145-.659-.145-1.406-.145H3.467c-.747 0-1.12 0-1.406.145-.25.128-.455.332-.582.583-.146.285-.146.658-.146 1.405z"
          stroke={color}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_384_5712">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
