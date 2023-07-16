import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Colors } from '../../theme/colors';

type TypeFonts = 'Pop-Black' | 'Pop-Black-Italic' | 'Pop-Semibold' | 'Pop-Semibold-Italic' | 'Pop-Regular' | 'Pop-Italic' | 'Pop-Light' | 'Pop-Light-Italic'

interface CustomTextProps extends TextProps {
  fontFamily?: TypeFonts;
  color?: string;
  fontSize?: number
}

const CustomText: FC<CustomTextProps> = ({ fontSize = 14, fontFamily = 'Pop-Regular', color = Colors.black, style, ...restProps }) => {

  let [fontsLoaded] = Font.useFonts({
    'Pop-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Pop-Black-Italic': require('../../../assets/fonts/Poppins-BlackItalic.ttf'),
    'Pop-Semibold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
    'Pop-Semibold-Italic': require('../../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Pop-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
    'Pop-Italic': require('../../../assets/fonts/Poppins-Italic.ttf'),
    'Pop-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
    'Pop-Light-Italic': require('../../../assets/fonts/Poppins-LightItalic.ttf'),
  })

  if(!fontsLoaded) return <AppLoading />
  const textStyle = [{ fontFamily, color, fontSize }, style];
  return <Text style={textStyle} {...restProps}/>;
};

export default CustomText;
