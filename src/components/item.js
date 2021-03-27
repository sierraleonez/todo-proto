import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
export default function item({task, onPress, doneTodo, done, detail, id}) {
  return (
    <View
      key={id}
      style={{
        width: screenWidth - 32,
        marginHorizontal: 32,
        paddingVertical: 24,
        paddingHorizontal: 8,
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        elevation: 4,
        marginBottom: 32,
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        onPress={doneTodo}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        {done ? (
          <Icon name="remove-done" size={24} color="#000" />
        ) : (
          <Icon name="done" size={24} color="#000" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={detail}
        style={{flex: 4, alignItems: 'center'}}>
        <Text
          style={{
            color: done ? 'green' : '#404852',
            fontFamily: 'Poppins-Regular',
          }}>
          {task}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={onPress}
        style={{
          alignItems: 'center',
          flex: 1,
        }}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}
