import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
const screenWidth = Dimensions.get('window').width;
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function addTodo({
  input,
  setInput,
  desc,
  setDesc,
  date,
  setDate,
  todoMaster,
  buatNotif,
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 24,
        height: hp('55%'),
        width: screenWidth,
      }}>
      <Text style={{fontFamily: 'Nunito-Bold', fontsize: 24, marginBottom: 8}}>
        Create Task
      </Text>
      <TextInput
        value={input}
        onChangeText={(inp) => {
          setInput(inp);
        }}
        placeholder="Tell Us What You Wanna Do..."
        style={{
          borderColor: '#9f9f9f',
          borderWidth: 1,
          width: screenWidth - 64,
          height: 42,
          borderRadius: 25,
          paddingHorizontal: 16,
        }}
      />
      <TextInput
        value={desc}
        onChangeText={(dsc) => {
          setDesc(dsc);
        }}
        placeholder="Description of your task goes here..."
        style={{
          marginTop: 16,
          borderColor: '#9f9f9f',
          borderWidth: 1,
          width: screenWidth - 64,
          height: 42,
          borderRadius: 25,
          paddingHorizontal: 16,
        }}
      />
      <View>
        <DatePicker
          minimumDate={new Date()}
          date={date}
          onDateChange={(data) => {
            setDate(data);
          }}
          mode="time"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          input == '' ? alert('Task Cannot Be Empty') : todoMaster(input, desc);
          buatNotif(input, desc, date);
        }}
        style={{
          alignSelf: 'flex-end',
          marginHorizontal: 32,
          marginTop: 16,
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: 'red',
          justifyContent: 'center',
          borderRadius: 20,
          marginBottom: 16,
        }}>
        <Text style={{color: '#f5f5f5'}}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}
