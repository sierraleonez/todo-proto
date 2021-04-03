import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
export default function item({task, onPress, doneTodo, done, detail, id, due}) {
  let currentDate = new Date();
  let hours = JSON.stringify(new Date(due).getHours());
  let minutes = JSON.stringify(new Date(due).getMinutes());
  let diff = Math.abs(parseInt(hours) - currentDate.getHours());
  let minDiff = Math.abs(parseInt(minutes) - currentDate.getMinutes());

  return (
    <View
      key={id}
      style={{
        width: wp('70 %'),
        height: heightPercentageToDP('8%'),
        paddingVertical: 24,
        paddingHorizontal: 8,
        flexDirection: 'row',
        // borderWidth: 0.5,
        backgroundColor: diff <= 0 || minDiff <= 0 ? '#634DA2' : '#fff',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 8,
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        onPress={doneTodo}
        style={{
          alignItems: 'center',
          borderColor: '#634DA2',
          borderWidth: 0.7,
          borderRadius: 4,
          width: 20,
          height: 20,
          backgroundColor: done ? '#634DA2' : '#fff',
        }}>
        {done && <Icon name="done" size={16} color="#fff" />}
      </TouchableOpacity>
      <TouchableOpacity onPress={detail} style={{flex: 4, marginLeft: 16}}>
        <Text
          style={{
            color: diff <= 0 || minDiff <= 0 ? '#F5F6F8' : '#404852',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}>
          {task}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: diff <= 0 || minDiff <= 0 ? '#D9EDFC' : '#ABB1BB',
            fontSize: 14,
            lineHeight: 16,
          }}>
          {(hours.length == 1 ? '0' + hours : hours) +
            ':' +
            (minutes.length == 1 ? '0' + minutes : minutes)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.2}
        onPress={onPress}
        style={{
          alignItems: 'center',
          flex: 1,
        }}>
        <Icon
          name="delete-outline"
          size={24}
          color={diff <= 0 || minDiff <= 0 ? '#F7FBFE' : '#2E3C40'}
        />
      </TouchableOpacity>
    </View>
  );
}
