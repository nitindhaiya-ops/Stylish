// src/components/icons/Icons.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';

type IconProps = {
  width?: number;
  height?: number;
  style?: ViewStyle;
  color?: string;
};

export const UserIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#626262', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" style={style} fill="none">
    <Path d="M9 14C6.23858 14 4 16.2386 4 19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19C20 16.2386 17.7614 14 15 14H9Z" fill={color} />
    <Path d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z" fill={color} />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({ width = 16, height = 20, color = '#626262', style }) => (
  <Svg width={width} height={height} viewBox="0 0 16 20" style={style} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.16146 7H11.8385C12.3657 6.99998 12.8205 6.99997 13.195 7.03057C13.5904 7.06287 13.9836 7.13419 14.362 7.32698C14.9265 7.6146 15.3854 8.07355 15.673 8.63803C15.8658 9.01641 15.9371 9.40963 15.9694 9.80498C16 10.1795 16 10.6344 16 11.1615V15.8386C16 16.3657 16 16.8205 15.9694 17.195C15.9371 17.5904 15.8658 17.9836 15.673 18.362C15.3854 18.9265 14.9265 19.3854 14.362 19.673C13.9836 19.8658 13.5904 19.9371 13.195 19.9694C12.8205 20 12.3657 20 11.8385 20H4.16145C3.63431 20 3.17954 20 2.80498 19.9694C2.40963 19.9371 2.01641 19.8658 1.63803 19.673C1.07355 19.3854 0.614604 18.9265 0.326984 18.362C0.13419 17.9836 0.0628736 17.5904 0.0305726 17.195C-2.98917e-05 16.8205 -1.5696e-05 16.3657 7.59377e-07 15.8386V11.1614C-1.5696e-05 10.6343 -2.98899e-05 10.1795 0.0305726 9.80498C0.0628736 9.40963 0.13419 9.01641 0.326984 8.63803C0.614604 8.07355 1.07355 7.6146 1.63803 7.32698C2.01641 7.13419 2.40963 7.06287 2.80498 7.03057C3.17953 6.99997 3.63434 6.99998 4.16146 7ZM8 13C7.44772 13 7 13.4477 7 14V15C7 15.5523 7.44772 16 8 16C8.55229 16 9 15.5523 9 15V14C9 13.4477 8.55229 13 8 13Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V7H10V4C10 2.89543 9.10457 2 8 2C6.89543 2 6 2.89543 6 4V7H4V4Z"
      fill={color}
    />
  </Svg>
);

export const EyeOpenIcon: React.FC<IconProps> = ({ width = 20, height = 20, color = '#626262', style }) => (
  // simple eye open — you can replace with a different path if you have another SVG
  <Svg width={width} height={height} viewBox="0 0 24 24" style={style} fill="none">
    <Path
      d="M12 5C7 5 3.3 8.1 1.7 12C3.3 15.9 7 19 12 19C17 19 20.7 15.9 22.3 12C20.7 8.1 17 5 12 5Z"
      fill="none"
      stroke={color}
      strokeWidth={1.4}
    />
    <Path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill={color} />
  </Svg>
);

export const EyeClosedIcon: React.FC<IconProps> = ({ width = 20, height = 20, color = '#626262', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" style={style} fill="none">
    <Path d="M2 2L22 22" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4.9 4.9C7 3.2 9.4 2.2 12 2.2C17 2.2 20.7 5.3 22.3 9.2C21.3 11.6 19.5 13.7 17.3 15.1" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"/>
    {/* you can refine the closed-eye shapes; this works as a simple crossed-eye */}
  </Svg>
);
