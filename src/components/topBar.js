import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function topBar({title}) {
  return (
    <ImageBackground
      source={require('../../Assets/background/bg_1.png')}
      resizeMode={'cover'}
      style={{
        alignItems: 'center',
        width: screenWidth,
        height: hp('25%'),
      }}>
      <View style={{flexDirection: 'row', padding: 16}}>
        <TouchableOpacity style={{flex: 1}}>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#fff'}}>
            Hello
          </Text>
        </View>
        <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon name="bookmark" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
