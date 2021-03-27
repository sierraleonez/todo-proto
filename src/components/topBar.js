import React from 'react';
import {View, Text, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
export default function topBar({title}) {
  return (
    <View
      style={{
        alignItems: 'center',
        width: screenWidth,
        height: 56,
        justifyContent: 'center',
        backgroundColor: '#fcfcfc',
        elevation: 4,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Nunito-Bold',
        }}>
        {title}
      </Text>
    </View>
  );
}
