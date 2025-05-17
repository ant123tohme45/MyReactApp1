/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../theme/theme';
import { useFonts } from './FontContext';

type AppTextProps = TextProps & {
  weight?: 'regular' | 'medium' | 'bold';
  style?: any;
};

const AppText: React.FC<AppTextProps> = ({
  weight = 'regular',
  style,
  children,
  ...props
}) => {
  const { isDarkMode } = useTheme();
  const { fontFamily } = useFonts();

  const fontStyles = {
    regular: {
      fontFamily: `${fontFamily}-Regular`,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: `${fontFamily}-Medium`,
      fontWeight: '500',
    },
    bold: {
      fontFamily: `${fontFamily}-Bold`,
      fontWeight: 'bold',
    },
  };

  return (
    <Text
      style={[
        { color: isDarkMode ? '#ffffff' : '#2d3748' },
        fontStyles[weight],
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppText;
